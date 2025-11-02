import { MemberCard } from "../MemberCard";

export default function MemberCardExample() {
  return (
    <div className="p-6 max-w-xs">
      <MemberCard
        id="1"
        name="Sarah Johnson"
        role="President"
        year="Senior, Environmental Science"
        email="sarah.j@college.edu"
      />
    </div>
  );
}
