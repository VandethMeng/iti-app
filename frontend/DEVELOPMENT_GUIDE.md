# Frontend Development Guide

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## API Connection

The frontend connects to the backend at:

- **Development**: http://localhost:8080/api
- **Production**: Configure via `NEXT_PUBLIC_API_URL`

## Component Usage Examples

### Button

```tsx
import Button from "@/components/ui/Button";

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>;
```

### Card

```tsx
import { Card, CardHeader, CardBody, CardTitle } from "@/components/ui/Card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content here</CardBody>
</Card>;
```

### Input

```tsx
import Input from "@/components/ui/Input";

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>;
```

### Table

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from "@/components/ui/Table";

<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

## API Usage

### Authentication

```tsx
import { authUtils } from "@/lib/auth";

// Login
const user = await authUtils.login(email, password);

// Check if authenticated
const isAuth = authUtils.isAuthenticated();

// Get current user
const user = authUtils.getUser();

// Logout
authUtils.logout();
```

### API Calls

```tsx
import { api } from "@/lib/api";

// Get students
const students = await api.getActiveStudents();

// Get student by ID
const student = await api.getStudent(id);

// Create enrollment
const enrollment = await api.enrollStudent(studentId, courseId);
```

## Routing Structure

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Require Authentication)

**Student Portal:**

- `/student/dashboard`
- `/student/courses`
- `/student/enrollment`
- `/student/gpa`
- `/student/payments`
- `/student/profile`

**Teacher Portal:**

- `/teacher/dashboard`
- `/teacher/courses`
- `/teacher/attendance`
- `/teacher/students`

**Enrollment Office:**

- `/enrollment-office/dashboard`
- `/enrollment-office/students`
- `/enrollment-office/enrollments`
- `/enrollment-office/documents`

**Admin Portal:**

- `/admin/dashboard`
- `/admin/students`
- `/admin/teachers`
- `/admin/courses`
- `/admin/payments`
- `/admin/reports`

## Utility Functions

### Date Formatting

```tsx
import { formatDate, formatDateTime } from "@/lib/utils";

formatDate("2024-01-15T10:30:00"); // "January 15, 2024"
formatDateTime("2024-01-15T10:30:00"); // "Jan 15, 2024, 10:30 AM"
```

### Currency Formatting

```tsx
import { formatCurrency } from "@/lib/utils";

formatCurrency(1500); // "$1,500.00"
```

### Status Colors

```tsx
import { getStatusColor } from "@/lib/utils";

const className = getStatusColor("ENROLLED"); // "bg-green-100 text-green-800"
```

## TypeScript Types

All types are defined in `lib/types.ts`:

- `User`, `Student`, `Teacher`
- `Course`, `Enrollment`, `Attendance`
- `Payment`, `Document`, `Notification`

## Best Practices

1. **Always use TypeScript** for type safety
2. **Use the API client** instead of direct fetch calls
3. **Handle loading states** with LoadingSpinner
4. **Show errors** using Alert component
5. **Follow the component structure** for consistency
6. **Use utility functions** for formatting
7. **Keep components modular** and reusable

## Troubleshooting

### API Connection Issues

- Verify backend is running on port 8080
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is configured on backend

### Authentication Issues

- Check token in localStorage
- Verify token is included in requests
- Check backend authentication endpoint

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## Performance Tips

1. Use `'use client'` only when needed
2. Implement pagination for large lists
3. Debounce search inputs
4. Use React.memo for expensive components
5. Optimize images with Next.js Image component
