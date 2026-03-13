# Phase 3 Visual Design Guide - Image-Forward Layouts

## Overview

This guide documents the Phase 3 visual components designed to create compelling, image-forward layouts that make "images speak louder than words." These components maintain the minimal design pattern while leveraging imagery for maximum visual impact.

## Visual Components

### 1. ImageHero Component

**Purpose**: Create impactful header sections with background images and overlays.

**Key Features**:

- Responsive background image handling
- Customizable overlay colors and opacity
- Staggered text animations
- Badge support for highlights
- Multiple text alignment options

**Usage Examples**:

```tsx
// About page hero
<ImageHero
    title="About Our School"
    subtitle="Excellence in Education Since 1985"
    description="Committed to nurturing young minds through innovation and tradition"
    backgroundImage="/images/about/campus-aerial.jpg"
    badge="Est. 1985"
    height={{ xs: '50vh', md: '60vh' }}
    textAlign="center"
/>

// Academic program hero
<ImageHero
    title="Academic Programs"
    description="Comprehensive curriculum designed for 21st-century learning"
    backgroundImage="/images/academics/classroom-hero.jpg"
    overlayOpacity={0.3}
    textAlign="left"
/>
```

### 2. ImageTextBlock Component

**Purpose**: Create versatile side-by-side content layouts with images.

**Key Features**:

- Left or right image positioning
- Responsive layout (stacks on mobile)
- CTA button integration
- Badge and category support
- Custom aspect ratios

**Usage Examples**:

```tsx
// Mission statement with image
<ImageTextBlock
    title="Our Mission"
    description="Empowering students through innovative education..."
    image="/images/mission-classroom.jpg"
    imageAlt="Students in collaborative learning"
    imagePosition="right"
    ctaText="Learn More"
    badge="Our Purpose"
    backgroundColor="#f8fafc"
/>

// Program highlight
<ImageTextBlock
    title="STEM Excellence"
    description="Award-winning science and technology programs..."
    image="/images/stem-lab.jpg"
    imageAlt="Students in science laboratory"
    imagePosition="left"
    imageAspectRatio="16/9"
/>
```

### 3. ImageGrid Component

**Purpose**: Responsive photo galleries with lightbox and filtering capabilities.

**Key Features**:

- Responsive column configuration
- Category filtering
- Lightbox modal with navigation
- Image titles and descriptions
- Hover animations and overlays

**Usage Examples**:

```tsx
// Campus facilities gallery
<ImageGrid
    images={facilityImages}
    columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
    aspectRatio="4/3"
    enableLightbox={true}
    showTitles={true}
    showCategories={true}
    filterCategories={true}
/>

// Simple image showcase
<ImageGrid
    images={showcaseImages}
    columns={{ xs: 2, md: 4 }}
    aspectRatio="1/1"
    enableLightbox={false}
    spacing={1}
/>
```

### 4. ProfileCard Component (Enhanced)

**Purpose**: Professional profile cards with prominent photo treatment.

**Key Features**:

- Gradient header backgrounds with patterns
- Large, bordered profile images
- Expandable content sections
- Contact information integration
- Multiple variants (faculty, leadership, staff)

**Usage Examples**:

```tsx
// Faculty member card
<ProfileCard
    name="Dr. Sarah Johnson"
    title="Head of Mathematics"
    department="Mathematics"
    bio="Expert in advanced calculus and statistical analysis..."
    avatar="/images/faculty/sarah-johnson.jpg"
    variant="faculty"
    yearsOfExperience={15}
    email="sarah@school.edu"
    specialties={['Calculus', 'Statistics']}
    showContactInfo={true}
/>

// Leadership profile
<ProfileCard
    name="John Smith"
    title="Principal"
    bio="Educational leader with 20+ years experience..."
    avatar="/images/leadership/john-smith.jpg"
    variant="leadership"
    phone="+1-555-0123"
    achievements={['Excellence Award 2023']}
/>
```

### 5. ActivityCard Component

**Purpose**: Dynamic, visually-rich activity and program showcases.

**Key Features**:

- Large activity images with overlays
- Category and difficulty badges
- Enrollment tracking
- Rating display
- Interactive favorite/enroll buttons

**Usage Examples**:

```tsx
// Student club showcase
<ActivityCard
    title="Robotics Club"
    description="Build and program robots in our state-of-the-art lab..."
    image="/images/activities/robotics.jpg"
    category="STEM"
    schedule="Tuesdays 3:30-5:00 PM"
    location="Engineering Lab"
    capacity={20}
    enrolled={15}
    difficulty="Intermediate"
    rating={4.8}
    instructor="Prof. Chen"
    isPopular={true}
    onEnroll={handleEnroll}
/>

// Sports program
<ActivityCard
    title="Varsity Basketball"
    description="Competitive basketball program..."
    image="/images/sports/basketball.jpg"
    category="Sports"
    ageGroup="14-18 years"
    price="$250/semester"
    onViewDetails={handleDetails}
/>
```

### 6. TimelineItem Component

**Purpose**: Visual timeline entries with accompanying images.

**Key Features**:

- Alternating left/right positioning
- Category-specific icons and colors
- Image integration
- Statistics and details sections
- Responsive design (linear on mobile)

**Usage Examples**:

```tsx
// School history timeline
<TimelineItem
    year="2020"
    title="Digital Transformation"
    description="Comprehensive technology upgrade across campus..."
    image="/images/timeline/digital-upgrade.jpg"
    category="development"
    details={[
        'Installed 150+ interactive whiteboards',
        'Deployed 1:1 device program',
        'Launched custom LMS',
    ]}
    statistics={[
        { label: 'Classrooms', value: '150+' },
        { label: 'Devices', value: '2,000' },
    ]}
    isHighlight={true}
    position="right"
/>
```

## Design Principles

### 1. Image Quality Standards

- **Resolution**: Minimum 1200px width for hero images
- **Aspect Ratios**:
    - Hero: 16:9 (landscape)
    - Cards: 4:3 (balanced)
    - Profiles: 1:1 (square)
- **Format**: WebP preferred, JPG fallback
- **Optimization**: <500KB for cards, <1MB for heroes

### 2. Visual Hierarchy

- **Primary Images**: Hero banners, feature images
- **Secondary Images**: Card images, profile photos
- **Supporting Images**: Timeline, gallery items
- **Decorative**: Background patterns, gradients

### 3. Color Treatment

- **Overlays**: Black with 30-50% opacity for text readability
- **Borders**: 1px solid with theme divider color
- **Gradients**: Primary purple gradient for headers
- **Hover States**: Scale transforms and border color changes

### 4. Animation Patterns

- **Entrance**: Fade up with staggered delays
- **Hover**: Subtle scale (1.02-1.05) and elevation
- **Interaction**: Smooth transitions (0.3s ease-in-out)
- **Performance**: Use transform over position changes

## Page-Specific Implementation

### About Page

```tsx
<ImageHero
    title="About Riverside Academy"
    subtitle="Excellence in Education Since 1985"
    backgroundImage="/images/about/campus-hero.jpg"
    badge="Est. 1985"
/>

<ImageTextBlock
    title="Our Story"
    description="Founded with a vision to provide world-class education..."
    image="/images/about/founders.jpg"
    imagePosition="right"
/>

<TimelineItem
    year="1985"
    title="Foundation"
    description="School established with 50 students..."
    image="/images/about/historical.jpg"
    category="milestone"
/>
```

### Academics Page

```tsx
<ImageHero
    title="Academic Excellence"
    description="Comprehensive programs designed for success"
    backgroundImage="/images/academics/classroom-hero.jpg"
/>

<ImageGrid
    images={curriculumImages}
    columns={{ xs: 2, md: 4 }}
    showCategories={true}
    filterCategories={true}
/>

<ImageTextBlock
    title="STEM Programs"
    description="Award-winning science and technology curriculum..."
    image="/images/academics/stem-lab.jpg"
    ctaText="Explore Programs"
/>
```

### Faculty Page

```tsx
<ImageHero
    title="Our Educators"
    subtitle="Passionate Teachers, Proven Results"
    backgroundImage="/images/faculty/faculty-hero.jpg"
/>

<Grid container spacing={3}>
    {facultyMembers.map(member => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
            <ProfileCard
                {...member}
                variant="faculty"
                showContactInfo={true}
            />
        </Grid>
    ))}
</Grid>
```

### Student Life Page

```tsx
<ImageHero
    title="Vibrant Student Life"
    description="Where learning extends beyond the classroom"
    backgroundImage="/images/student-life/activities-hero.jpg"
/>

<Grid container spacing={3}>
    {activities.map(activity => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
            <ActivityCard
                {...activity}
                onEnroll={handleEnroll}
                onFavoriteToggle={handleFavorite}
            />
        </Grid>
    ))}
</Grid>

<ImageGrid
    images={studentLifeGallery}
    columns={{ xs: 1, sm: 2, md: 3 }}
    enableLightbox={true}
    showCategories={true}
/>
```

## Best Practices

### 1. Content Strategy

- **Image Selection**: Choose high-quality, authentic photos
- **Text Balance**: Keep descriptions concise and impactful
- **Call-to-Actions**: Use clear, action-oriented language
- **Categories**: Group related content logically

### 2. Performance Optimization

- **Lazy Loading**: Implement for images below the fold
- **Responsive Images**: Use srcSet for different screen sizes
- **Compression**: Optimize images without quality loss
- **Caching**: Implement proper cache headers

### 3. Accessibility

- **Alt Text**: Descriptive alternative text for all images
- **Contrast**: Ensure text readability over images
- **Focus States**: Visible focus indicators for keyboard navigation
- **Screen Readers**: Proper ARIA labels and structure

### 4. Mobile Considerations

- **Touch Targets**: Minimum 44px for interactive elements
- **Scroll Performance**: Use transform3d for smooth animations
- **Image Sizing**: Optimize for mobile bandwidth
- **Layout**: Stack content vertically on small screens

## Component Combinations

### Hero + Text Blocks Pattern

```tsx
<ImageHero title="Section Title" backgroundImage="/hero.jpg" />
<Container>
    <ImageTextBlock {...content1} imagePosition="right" />
    <ImageTextBlock {...content2} imagePosition="left" />
    <ImageTextBlock {...content3} imagePosition="right" />
</Container>
```

### Profile Gallery Pattern

```tsx
<ImageHero title="Meet Our Team" />
<Container>
    <Grid container spacing={3}>
        {profiles.map((profile, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={profile.id}>
                <ProfileCard {...profile} index={index} />
            </Grid>
        ))}
    </Grid>
</Container>
```

### Timeline Narrative Pattern

```tsx
<ImageHero title="Our Journey" />
<Container>
    {timelineEvents.map((event, index) => (
        <TimelineItem
            key={event.id}
            {...event}
            position={index % 2 === 0 ? 'right' : 'left'}
            index={index}
        />
    ))}
</Container>
```

## Maintenance Guidelines

### 1. Image Management

- **Naming**: Use descriptive, consistent naming conventions
- **Organization**: Group by section/category
- **Backup**: Maintain high-resolution originals
- **Updates**: Regular refresh of outdated content

### 2. Performance Monitoring

- **Load Times**: Monitor image loading performance
- **Bundle Size**: Track component bundle impact
- **User Metrics**: Analyze engagement with visual content
- **Core Web Vitals**: Optimize for Google's metrics

### 3. Content Updates

- **Seasonal**: Update images for current seasons/events
- **Achievements**: Refresh statistics and accomplishments
- **Staff Changes**: Update profile information promptly
- **Program Updates**: Reflect curriculum changes

This visual design system creates a cohesive, professional appearance while maintaining the project's minimal design philosophy. The image-forward approach ensures that visual content enhances rather than overwhelms the user experience, making each page both informative and visually engaging.
