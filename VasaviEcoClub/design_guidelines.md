# Eco Club Website - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based with Eco-Conscious Inspiration

Drawing from modern environmental organizations and eco-conscious digital experiences (WWF, Patagonia, Ecosia) combined with educational platform clarity. The design balances organic, nature-inspired aesthetics with functional information architecture for student engagement.

**Core Principles:**
- Natural & Organic: Reflect environmental values through design
- Accessible & Inviting: Encourage student participation
- Data-Driven Impact: Showcase metrics with clarity and pride
- Community-Focused: Highlight collective action and member contributions

## Color Palette

**Light Mode:**
- Primary: 145 65% 35% (Forest Green - headers, CTAs, primary actions)
- Secondary: 145 55% 25% (Deep Forest - navigation, footers)
- Accent: 45 95% 55% (Eco Gold - highlights, achievements, success states sparingly)
- Background: 0 0% 98% (Off-white - main background)
- Surface: 0 0% 100% (Pure white - cards, panels)
- Text Primary: 145 30% 15% (Dark forest for body text)
- Text Secondary: 145 20% 40% (Muted green for secondary text)

**Dark Mode:**
- Primary: 145 50% 55% (Soft Green)
- Secondary: 145 45% 45% (Medium Green)
- Accent: 45 85% 65% (Light Eco Gold)
- Background: 145 15% 10% (Deep forest background)
- Surface: 145 12% 15% (Card surfaces)
- Text Primary: 145 20% 90% (Light text)
- Text Secondary: 145 15% 70% (Muted light text)

## Typography

**Font Families:**
- Headings: 'Inter' or 'Plus Jakarta Sans' (600-700 weight) - Clean, modern, professional
- Body: 'Inter' (400-500 weight) - Excellent readability
- Metrics/Numbers: 'Space Mono' or 'JetBrains Mono' (500 weight) - Technical precision for impact data

**Type Scale:**
- Hero Headline: text-5xl lg:text-7xl (Bold 700)
- Section Titles: text-3xl lg:text-4xl (Semibold 600)
- Card Titles: text-xl lg:text-2xl (Semibold 600)
- Body Text: text-base lg:text-lg (Regular 400)
- Captions: text-sm (Medium 500)

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-24
- Card spacing: p-6 to p-8
- Grid gaps: gap-6 to gap-8

**Container Widths:**
- Full-width sections: w-full with max-w-7xl mx-auto px-4
- Content sections: max-w-6xl
- Admin panels: max-w-screen-xl
- Forms: max-w-md to max-w-2xl

**Grid Patterns:**
- Event cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Member profiles: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Project showcase: grid-cols-1 lg:grid-cols-2
- Impact metrics: grid-cols-2 md:grid-cols-4

## Component Library

**Navigation:**
- Sticky header with glass morphism effect (backdrop-blur-md bg-white/90)
- Logo with leaf icon on left
- Horizontal menu for desktop, hamburger for mobile
- Green underline animation on hover for nav links
- "Register" CTA button in primary green

**Hero Section:**
- Full-width with nature-themed background image (students in campus garden/eco activity)
- Overlay gradient: from-forest-green/80 to-forest-green/60
- Large headline + tagline with outline buttons on blurred backgrounds
- Floating metric cards showing impact (trees planted, waste reduced)

**Cards:**
- Elevated shadows (shadow-lg) with hover lift effect
- Rounded corners (rounded-xl)
- White backgrounds in light mode, surface green in dark mode
- Image thumbnails at top with overlay icons for categories

**Event Cards:**
- Date badge in top-left corner (rounded background)
- Event image, title, location, participant count
- "Register Now" button in primary green
- RSVP count indicator with user icons

**Forms:**
- Clean, spacious input fields (h-12, p-4)
- Green focus rings (focus:ring-2 focus:ring-forest-green)
- Labels above inputs (text-sm font-medium)
- Submit buttons full-width on mobile
- Success states with checkmark animations

**Impact Metrics Dashboard:**
- Large number displays with animated count-up
- Icon indicators for each metric (leaf, recycle, water drop)
- Progress bars in gradient greens
- Comparison cards showing monthly/yearly growth
- Data visualization with subtle green gradients

**Photo Gallery:**
- Masonry grid layout (responsive columns)
- Lightbox on click with navigation arrows
- Category filters (Events, Projects, Members)
- Hover overlay with title and date
- Upload interface in admin with drag-and-drop zone

**Admin Panel:**
- Sidebar navigation with sections
- Data tables with sort/filter capabilities
- Quick action buttons (Edit/Delete) with confirmation modals
- Dashboard overview with key metrics cards
- Form wizards for multi-step operations

**Modals & Overlays:**
- Centered modal with backdrop blur
- Smooth slide-in animations
- Close button (X) top-right
- Action buttons at bottom (Cancel in gray, Confirm in green)

## Animations & Interactions

Use sparingly for purposeful feedback:
- Subtle fade-in on scroll for sections
- Hover lift on cards (translate-y-1)
- Button press feedback (scale-95)
- Success checkmark animation on form submission
- Number count-up for impact metrics
- Smooth page transitions

## Page-Specific Layouts

**Home Page:**
- Hero with campus eco-activity image
- Mission statement section
- Featured upcoming events (3-card grid)
- Impact metrics highlight
- Recent gallery preview
- Member testimonials
- CTA for joining/registering

**Activities/Events:**
- Filter bar (Upcoming, Past, All Categories)
- Event grid with registration status
- Featured event highlight at top
- Calendar view toggle option

**Members Page:**
- Grid of member cards with photos
- Role badges (President, Volunteer, etc.)
- Filter by role/year
- Member count metric at top

**Projects Page:**
- Two-column layout (image + description)
- Status indicators (Ongoing, Completed)
- Impact results per project
- Call-to-action to participate

**Gallery:**
- Masonry/Pinterest-style layout
- Category tabs
- Infinite scroll or pagination
- Full-screen lightbox

**Impact Metrics:**
- Hero metric cards (4-column grid)
- Historical graphs (line/bar charts in green)
- Project breakdown
- Comparison with goals

**Admin Panel:**
- Dashboard with quick stats
- Tabbed interface (Events, Members, Projects, Gallery, Metrics)
- CRUD tables with inline actions
- Upload interfaces for images
- Preview before publish

## Images

**Required Images:**
1. **Hero Image (Home):** Students participating in campus eco-activities (tree planting, garden work, recycling drive) - bright, engaging, action-oriented
2. **Event Thumbnails:** Activity-specific photos (cleanup drives, workshops, exhibitions)
3. **Member Photos:** Professional headshots with natural backgrounds
4. **Project Images:** Before/after comparisons, process photos
5. **Gallery Collection:** Mix of event photos, impact results, team activities
6. **Background Patterns:** Subtle leaf/nature patterns for section dividers

**Image Treatment:**
- Rounded corners on all images (rounded-lg to rounded-xl)
- Subtle green overlay on hover
- Optimized for web (lazy loading)
- Alt text for accessibility

## Responsive Behavior

**Mobile (< 768px):**
- Single column layouts
- Stack navigation in hamburger menu
- Full-width cards
- Larger touch targets (min 44px)
- Simplified metric displays

**Tablet (768px - 1024px):**
- Two-column grids
- Visible navigation
- Balanced content density

**Desktop (> 1024px):**
- Full multi-column layouts
- Hover interactions enabled
- Expanded admin panels
- Side-by-side forms