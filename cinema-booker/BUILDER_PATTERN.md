# Builder Design Pattern Implementation

This project implements the **Builder Design Pattern** to simplify the construction of complex objects like bookings and emails.

## What is the Builder Pattern?

The Builder Pattern is a creational design pattern that provides a flexible solution for creating complex objects. Instead of using multiple constructors or passing many parameters, the Builder Pattern uses a step-by-step approach to construct objects.

### Benefits:
- **Readable Code**: Fluent interface makes code self-documenting
- **Flexible Construction**: Build objects step-by-step with optional parameters
- **Validation**: Ensures all required fields are set before object creation
- **Immutability**: The built object can be made immutable
- **Testability**: Easy to create test objects with specific configurations

## Implementation Overview

### 1. BookingBuilder

Located in: `src/builders/BookingBuilder.ts`

The `BookingBuilder` simplifies the creation of booking objects with many fields (movie ID, seats, tickets, promo codes, etc.).

**Example Usage:**

```typescript
import { BookingBuilder } from '@/builders/BookingBuilder';

// Create a booking using the fluent interface
const booking = new BookingBuilder()
    .setMovieId('movie123')
    .setShowId('show456')
    .setUserId('user789')
    .setSeats(['A1', 'A2', 'A3'])
    .setTickets(2, 1, 0) // 2 adult, 1 child, 0 senior
    .setOrderTotal(45.50)
    .setPaymentCard('4242')
    .setPromoCode('SUMMER20', 'promo123')
    .setMovieTitle('Inception')
    .setShowtime('7:30 PM')
    .setDate('2025-12-15')
    .setAuditorium('Theater 1')
    .setUserEmail('user@example.com')
    .setUserName('John Doe')
    .build(); // Returns validated BookingData object

// The builder validates that all required fields are present
// and throws an error if validation fails
```

**Key Methods:**
- `setMovieId(id)` - Sets the movie identifier
- `setShowId(id)` - Sets the show identifier
- `setUserId(id)` - Sets the user identifier
- `setSeats(seats)` - Sets selected seat array
- `setTickets(adult, child, senior)` - Sets ticket counts
- `setOrderTotal(amount)` - Sets the total payment amount
- `setPromoCode(code, id)` - Sets promotional code details
- `setPaymentCard(lastFour)` - Sets payment card (last 4 digits)
- `build()` - Validates and returns the complete booking object
- `reset()` - Resets the builder to create a new booking
- `clone()` - Creates a copy of the current builder state

**Where It's Used:**
- `src/facades/BookingFacade.ts` - in the `confirmAndPay()` method

### 2. EmailBuilder

Located in: `src/builders/EmailBuilder.ts`

The `EmailBuilder` and its specialized variants simplify email creation with proper type safety and validation.

**Base EmailBuilder Example:**

```typescript
import { EmailBuilder } from '@/builders/EmailBuilder';

const email = new EmailBuilder()
    .setRecipient('user@example.com')
    .setSubject('Welcome to Cinema Booker!')
    .setText('Plain text version...')
    .setHtml('<h1>HTML version...</h1>')
    .setPriority('high')
    .build();

await sendEmail(email);
```

**Specialized Builders:**

#### BookingConfirmationEmailBuilder

```typescript
import { BookingConfirmationEmailBuilder } from '@/builders/EmailBuilder';
import { 
    generateBookingConfirmationEmailHtml, 
    generateBookingConfirmationEmailText 
} from '@/lib/email';

const email = new BookingConfirmationEmailBuilder()
    .setRecipient('user@example.com')
    .setBookingDetails(
        'John Doe',
        {
            bookingId: 'BK123456',
            movieTitle: 'Inception',
            showtime: '7:30 PM',
            date: '2025-12-15',
            auditorium: 'Theater 1',
            seats: ['A1', 'A2'],
            adultTickets: 2,
            childTickets: 0,
            seniorTickets: 0,
            orderTotal: 30.00,
            bookingDate: new Date().toISOString()
        },
        generateBookingConfirmationEmailHtml,
        generateBookingConfirmationEmailText
    )
    .build();
```

#### PromotionalEmailBuilder

```typescript
import { PromotionalEmailBuilder } from '@/builders/EmailBuilder';
import { 
    generatePromotionalEmailHtml, 
    generatePromotionalEmailText 
} from '@/lib/email';

const email = new PromotionalEmailBuilder()
    .setRecipient('user@example.com')
    .setPromoDetails(
        'John Doe',
        'SUMMER20',
        20, // 20% discount
        '2025-07-01',
        '2025-07-31',
        generatePromotionalEmailHtml,
        generatePromotionalEmailText
    )
    .build();
```

#### VerificationEmailBuilder

```typescript
import { VerificationEmailBuilder } from '@/builders/EmailBuilder';
import { 
    generateVerificationEmailHtml, 
    generateVerificationEmailText 
} from '@/lib/email';

const email = new VerificationEmailBuilder()
    .setRecipient('user@example.com')
    .setVerificationDetails(
        'user@example.com',
        'https://cinemabooter.com/verify?token=abc123',
        generateVerificationEmailHtml,
        generateVerificationEmailText
    )
    .build();
```

#### PasswordResetEmailBuilder

```typescript
import { PasswordResetEmailBuilder } from '@/builders/EmailBuilder';
import { 
    generatePasswordResetEmailHtml, 
    generatePasswordResetEmailText 
} from '@/lib/email';

const email = new PasswordResetEmailBuilder()
    .setRecipient('user@example.com')
    .setResetDetails(
        'user@example.com',
        'https://cinemabooter.com/reset?token=xyz789',
        generatePasswordResetEmailHtml,
        generatePasswordResetEmailText
    )
    .build();
```

### Helper Functions in email.ts

For convenience, `src/lib/email.ts` provides helper functions that use the builders internally:

```typescript
import { 
    buildBookingConfirmationEmail,
    buildPromotionalEmail,
    buildVerificationEmail,
    buildPasswordResetEmail,
    buildProfileUpdateEmail
} from '@/lib/email';

// Quick booking confirmation email
const bookingEmail = buildBookingConfirmationEmail(
    'user@example.com',
    'John Doe',
    bookingDetails
);

// Quick promotional email
const promoEmail = buildPromotionalEmail(
    'user@example.com',
    'John Doe',
    'SUMMER20',
    20,
    '2025-07-01',
    '2025-07-31'
);

// Quick verification email
const verifyEmail = buildVerificationEmail(
    'user@example.com',
    verificationUrl
);

// Quick password reset email
const resetEmail = buildPasswordResetEmail(
    'user@example.com',
    resetUrl
);

// Quick profile update email
const updateEmail = buildProfileUpdateEmail(
    'user@example.com',
    'John Doe',
    ['email', 'password']
);
```

## Code Examples

### Before Builder Pattern (Complex Constructor)

```typescript
// Old way - error-prone with many parameters
const bookingData = {
    movieID: movieId,
    promoCode: promoCode ?? '',
    promoCodeID: promo?._id ?? '',
    showID: showId,
    userID: user._id,
    paymentCardUsed: cardLastFour,
    bookingDate: bookingDate,
    orderTotal: finalOrderTotal,
    seats: selectedSeats,
    tickets: {
        child: childTickets,
        adult: adultTickets,
        senior: seniorTickets
    },
    userEmail: user.email,
    userName: user.firstName || user.username || 'Customer',
    movieTitle: movieTitle,
    showtime: showtime,
    date: date,
    auditorium: auditorium
};
```

### After Builder Pattern (Fluent Interface)

```typescript
// New way - clear, readable, and validated
const bookingData = new BookingBuilder()
    .setMovieId(movieId)
    .setShowId(showId)
    .setUserId(user._id)
    .setPromoCode(promoCode ?? '', promo?._id ?? '')
    .setPaymentCard(cardLastFour)
    .setBookingDate(new Date().toISOString())
    .setOrderTotal(finalOrderTotal)
    .setSeats(selectedSeats)
    .setTickets(adultTickets, childTickets, seniorTickets)
    .setUserEmail(user.email)
    .setUserName(user.firstName || user.username || 'Customer')
    .setMovieTitle(movieTitle || '')
    .setShowtime(showtime || '')
    .setDate(date || '')
    .setAuditorium(auditorium || '')
    .build(); // Validates all required fields
```

## Validation Features

Both builders include validation:

### BookingBuilder Validation:
- Ensures all required fields are set (movieID, showID, userID, etc.)
- Validates at least one seat is selected
- Validates at least one ticket is purchased
- Throws descriptive errors if validation fails

### EmailBuilder Validation:
- Ensures recipient (to) is set
- Ensures subject is set
- Ensures either text or HTML content is present
- Throws descriptive errors if validation fails

## Testing with Builders

Builders make testing easier:

```typescript
// Create test bookings easily
const testBooking = new BookingBuilder()
    .setMovieId('test-movie')
    .setShowId('test-show')
    .setUserId('test-user')
    .setSeats(['A1'])
    .setTickets(1, 0, 0)
    .setOrderTotal(15.00)
    .setPaymentCard('1234')
    .build();

// Clone and modify for variations
const vipBooking = new BookingBuilder()
    .setMovieId('test-movie')
    .setShowId('vip-show')
    .setUserId('test-user')
    .setSeats(['VIP1', 'VIP2'])
    .setTickets(2, 0, 0)
    .setOrderTotal(50.00)
    .setPaymentCard('1234')
    .build();
```

## Additional Features

### Method Chaining
All builder methods return `this`, allowing for fluent method chaining:

```typescript
const booking = builder
    .setMovieId('123')
    .setShowId('456')
    .setUserId('789')
    .build();
```

### Reset and Reuse
Reset a builder to create multiple objects:

```typescript
const builder = new BookingBuilder();

const booking1 = builder
    .setMovieId('movie1')
    // ... other settings
    .build();

builder.reset(); // Clear and start fresh

const booking2 = builder
    .setMovieId('movie2')
    // ... other settings
    .build();
```

### Clone
Create variations of objects:

```typescript
const baseBuilder = new BookingBuilder()
    .setMovieId('movie1')
    .setShowId('show1')
    .setUserId('user1');

const booking1 = baseBuilder.clone()
    .setSeats(['A1'])
    .setTickets(1, 0, 0)
    .setOrderTotal(15.00)
    .setPaymentCard('1234')
    .build();

const booking2 = baseBuilder.clone()
    .setSeats(['B1', 'B2'])
    .setTickets(2, 0, 0)
    .setOrderTotal(30.00)
    .setPaymentCard('5678')
    .build();
```

## Integration Points

The Builder Pattern is currently integrated in:

1. **BookingFacade** (`src/facades/BookingFacade.ts`)
   - `confirmAndPay()` method uses `BookingBuilder`

2. **Email Library** (`src/lib/email.ts`)
   - Helper functions use various email builders
   - Can be used directly in API routes or controllers

## Future Enhancements

Potential areas to expand the Builder Pattern:

1. **MovieBuilder** - For creating movie objects with cast, crew, showtimes
2. **UserBuilder** - For user registration and profile creation
3. **ShowBuilder** - For scheduling shows with complex configurations
4. **PromoCodeBuilder** - For creating promotional campaigns
5. **ReportBuilder** - For generating complex reports with filters

## Design Pattern Benefits in This Project

1. **Separation of Concerns**: Object construction logic is separate from business logic
2. **Type Safety**: TypeScript ensures all builders are used correctly
3. **Maintainability**: Easy to add new fields without breaking existing code
4. **Readability**: Code reads like natural language
5. **Validation**: Centralized validation logic prevents invalid objects
6. **Testability**: Easy to create test objects with specific states

## References

- [Builder Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/builder)
- [Builder Pattern - Wikipedia](https://en.wikipedia.org/wiki/Builder_pattern)
- [TypeScript Design Patterns](https://www.typescriptlang.org/docs/handbook/decorators.html)
