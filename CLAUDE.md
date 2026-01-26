# CLAUDE.md - Project Memory & Standards

## Project Overview

**Parent Portal Web Application** - Modern school showcase & parent portal system

- **Tech Stack**: React 19.2.0, TypeScript, Vite, Material-UI (MUI), SwiperJS
- **Purpose**: Sellable to any school - landing page + auth + parent portal

## 🚨 CRITICAL: MUI Grid v2 Syntax

**ALWAYS use the new Grid v2 syntax:**

```tsx
// ✅ CORRECT - Grid v2 syntax
<Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
  <Component />
</Grid>

// ❌ WRONG - Deprecated Grid v1 syntax
<Grid item xs={12} md={6} key={item.id}>
  <Component />
</Grid>
```

## 🎨 Theme & Design Standards

### Color Scheme

- **Primary**: Purple (#6366f1, #8b5cf6, #4338ca)
- **Secondary**: Neutral grays (#171717 to #fafafa)
- **Background**: #fefefe (main), #ffffff (paper)

### Typography

- **Font**: Outfit (300, 400, 500, 600, 700 weights)
- **Sizes**: Smaller than default MUI (body1: 0.875rem, body2: 0.8125rem)
- **Responsive**: Use `fontSize: { xs: '1rem', md: '1.25rem' }` pattern

### Spacing & Layout

- **Border Radius**: 4px (extra small for modern look)
- **Container Padding**: 24px (lg), 16px (md) on mobile
- **Generous Whitespace**: Use spacing scale (xs:4, sm:8, md:16, lg:24, xl:32)

## 🔧 Code Standards

### Import Order

```tsx
// 1. React & core libraries
import React from 'react';
import { Box, Typography } from '@mui/material';

// 2. Third-party libraries
import { useNavigate } from 'react-router-dom';

// 3. Internal hooks & utilities
import { useIntersectionObserver } from '../../hooks/ui/useIntersectionObserver';

// 4. Internal components
import { ComponentName } from '../components/ComponentName';
```

### SwiperJS Imports (CRITICAL)

```tsx
// ✅ CORRECT - Modern import paths
import type { SwiperOptions } from 'swiper';
import {
    Navigation,
    Pagination,
    Autoplay,
    A11y,
    Keyboard,
    EffectFade,
} from 'swiper/modules';

// ❌ WRONG - Deprecated import paths
import type { SwiperOptions } from 'swiper/types';
```

### Component Structure

```tsx
// Interface first
interface ComponentProps {
    className?: string;
    // ... other props
}

// Main component
export const ComponentName: React.FC<ComponentProps> = ({
    className = '',
    // ... props
}) => {
    // Hooks first
    const { isIntersecting, targetRef } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true,
    });

    return (
        <Box
            id="section-id"
            component="section"
            className={className}
            ref={targetRef}
            sx={{
                py: { xs: 8, md: 12 },
                // ... styling
            }}
        >
            {/* Content */}
        </Box>
    );
};
```

## 🎭 Animation & Intersection Observer

### Standard Pattern

```tsx
// Always use intersection observer for scroll animations
const { isIntersecting, targetRef } = useIntersectionObserver({
  threshold: 0.1,
  freezeOnceVisible: true,
});

// Apply animations based on isIntersecting
sx={{
  opacity: isIntersecting ? 1 : 0,
  transform: isIntersecting ? 'translateY(0)' : 'translateY(30px)',
  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
}}
```

### Animation Delays

```tsx
// Stagger animations with delays
transitionDelay: `${index * 0.1}s`,
transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
```

## 🎠 SwiperJS Standards

### Module Configuration

```tsx
// Always include ALL required modules
modules={[Navigation, Pagination, Autoplay, A11y, Keyboard, EffectFade]}

// Use spread operator for config
<BaseSwiper
  {...config}
  className="swiper-type-name"
  modules={modules}
>
```

### CSS Classes

- Hero: `.hero-swiper`
- Testimonials: `.testimonial-swiper`
- Faculty: `.faculty-swiper`
- Always include corresponding CSS in `swiperStyles.css`

## 🎯 Landing Page Sections

### Section Structure

```tsx
<Box
    id="section-name" // For navigation anchors
    component="section"
    sx={{
        py: { xs: 8, md: 12 }, // Consistent vertical padding
        backgroundColor: '#fefefe' | '#f8fafc', // Alternate backgrounds
        position: 'relative',
        overflow: 'hidden', // Only if needed for decorative elements
    }}
>
    <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
                variant="h2"
                sx={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Section Title
            </Typography>
        </Box>
        {/* Content */}
    </Container>
</Box>
```

## 🚫 Common Pitfalls to Avoid

### Layout Issues

- ❌ Don't use `overflow: 'hidden'` on main containers (clips content)
- ❌ Don't set fixed heights unless absolutely necessary
- ❌ Avoid z-index conflicts (content should be 10+, backgrounds 1-2)

### Animation Issues

- ❌ Don't use `animation` CSS with `opacity: 0` initial state (causes disappearing content)
- ❌ Don't apply animations directly to swiper slides
- ❌ Avoid complex animation chains that can break

### Import/Module Issues

- ❌ Never use deprecated `'swiper/types'` import path
- ❌ Don't override swiper modules partially (include all required ones)
- ❌ Don't import MUI components individually (use destructured imports)

### Grid Issues

- ❌ Never use `<Grid item xs={12}>` (deprecated v1 syntax)
- ✅ Always use `<Grid size={{ xs: 12 }}>` (v2 syntax)

## 📝 File Organization

```
src/
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   └── ...
│   └── swiper/          # Swiper components
│       ├── BaseSwiper.tsx
│       ├── HeroSwiper.tsx
│       ├── swiperConfig.ts
│       └── swiperStyles.css
├── hooks/
│   └── ui/              # UI-related hooks
├── theme/
│   └── theme.ts         # MUI theme configuration
└── pages/
    ├── LandingPage.tsx
    ├── Auth/
    └── Portal/
```

## 🔍 Before Every Code Change

1. **Check Grid syntax** - Use v2 `size` prop, not `item`/`xs`
2. **Verify imports** - Use modern paths, not deprecated ones
3. **Test animations** - Ensure content doesn't disappear
4. **Check z-index** - Content above backgrounds
5. **Responsive design** - Test xs, sm, md, lg breakpoints
6. **TypeScript** - Ensure proper typing, no `any` unless necessary

## 🎯 Quality Checklist

### Before Committing

- [ ] All Grid components use v2 syntax
- [ ] No deprecated import paths
- [ ] Animations work without content disappearing
- [ ] Responsive design tested
- [ ] TypeScript errors resolved
- [ ] ESLint/Prettier passed
- [ ] No console errors in browser

### Performance

- [ ] Intersection observer used for scroll animations
- [ ] Images optimized and lazy loaded
- [ ] Swiper modules only loaded when needed
- [ ] No memory leaks in useEffect hooks

## 🚀 Development Commands

```bash
# Development
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Build
npm run build
npm run preview
```

## 💡 Pro Tips

1. **Gradual Enhancement**: Start with basic layout, add animations last
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Performance**: Use intersection observer to avoid unnecessary renders
4. **Consistency**: Follow established patterns from existing components
5. **Testing**: Test on multiple devices and screen sizes

---

**Last Updated**: January 2025
**Version**: 1.0
**Maintainer**: Claude AI Assistant
