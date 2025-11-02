import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rollNumber: z.string().min(1, "Roll number is required"),
  branch: z.string().min(1, "Branch is required"),
  email: z.string().email("Invalid email address"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

interface EventRegistrationModalProps {
  eventId: string;
  eventTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventRegistrationModal({
  eventId,
  eventTitle,
  open,
  onOpenChange,
}: EventRegistrationModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      branch: "",
      email: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegistrationForm) => {
      return apiRequest(`/events/${eventId}/register`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (response) => {
      setShowSuccess(true);
      toast({
        title: "Registration Successful",
        description: response.message,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RegistrationForm) => {
    registerMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="modal-event-registration">
        <DialogHeader>
          <DialogTitle>Register for {eventTitle}</DialogTitle>
          <DialogDescription>
            Fill in your details to register for this event
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="text-center py-6">
            <div className="mb-4 text-primary">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            <p className="text-muted-foreground mb-4">
              An email has been sent regarding your registration.
            </p>
            <Button
              onClick={() => {
                setShowSuccess(false);
                onOpenChange(false);
              }}
              data-testid="button-close-success"
            >
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="2021CS001" {...field} data-testid="input-roll-number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} data-testid="input-branch" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gmail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@gmail.com"
                        {...field}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={registerMutation.isPending}
                  data-testid="button-submit-registration"
                >
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
