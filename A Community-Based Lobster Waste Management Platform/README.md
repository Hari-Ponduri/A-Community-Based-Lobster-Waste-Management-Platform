# ShellCycle 

**Turn seafood waste into sustainable biomaterials**

ShellCycle is a waste-to-biomaterial sourcing platform that connects seafood restaurants (who generate crustacean shell waste) with research labs (who need crustacean shells for chitosan extraction and biomaterial applications).



## Tech Stack

- **Framework**: Next.js 
- **Language**: TypeScript
- **UI**: React + Tailwind CSS
- **AI**: OpenAI API (GPT-4 Turbo) for Match Advisor
- **State**: React Context (in-memory, session-based)

## Features

✅ **Restaurant Registration** - Restaurants can register their shell waste streams
✅ **Smart Matching** - Algorithm matches labs with suitable restaurants based on shell type, quantity, and storage
✅ **AI Match Advisor** - GPT-4 provides intelligent recommendations, logistics notes, and risk factors
✅ **Clean UI** - Simple, responsive interface built with Tailwind CSS

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-...your-key-here...
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### For Restaurants (Suppliers)

1. Click **"I am a Restaurant (Supplier)"** on the home page
2. Fill out the registration form:
   - Restaurant name
   - Shell type (shrimp, crab, lobster, or mixed)
   - Weekly quantity in kg
   - Storage method (frozen, refrigerated, or room temp)
   - Pickup window (e.g., "6-9 PM")
   - Location
3. Submit to register your waste stream
4. View confirmation with your listing details

### For Labs (Buyers)

1. Click **"I am a Lab (Buyer)"** on the home page
2. Enter your requirements:
   - Shell type needed
   - Weekly quantity needed (kg)
   - Pickup radius (km)
   - Pickup frequency (weekly or bi-weekly)
   - Research purpose (optional)
3. Click **"Find Matches"**
4. View:
   - **Best Match** - Top-scored restaurant
   - **Other Matches** - Alternative options
   - **AI Match Advisor** - Intelligent recommendations and logistics analysis

## Project Structure

```
shellcycle/
├── app/
│   ├── layout.tsx              # Root layout with context provider
│   ├── page.tsx                # Home/landing page
│   ├── restaurant/
│   │   └── page.tsx            # Restaurant registration
│   ├── lab/
│   │   └── page.tsx            # Lab matching interface
│   └── api/
│       └── ai-match/
│           └── route.ts        # AI advisor API endpoint
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── matching.ts             # Matching algorithm
│   └── RestaurantContext.tsx   # Shared state management
├── data/
│   └── seedRestaurants.ts      # Demo restaurant data
└── [config files]
```

## Matching Algorithm

The deterministic matching system scores restaurants based on:

- **Shell type compatibility** (+50 points for exact match, mixed acts as wildcard)
- **Storage method** (+20 points for frozen storage)
- **Quantity closeness** (+0 to 20 points based on how close supply is to demand)
- **Volume sufficiency** (minimum 50% of lab's weekly needs)

## AI Match Advisor

The AI advisor uses GPT-4 to:
- Confirm or adjust deterministic matches
- Provide plain-English explanations
- Highlight logistics considerations
- Identify potential risk factors

Gracefully degrades if AI is unavailable - core matching still works.

## Data Persistence

**Note**: This MVP uses in-memory state for demo purposes. Restaurant registrations persist only during the session and are lost on page reload. The app includes 6 seed restaurants for demonstration.

## Future Enhancements

- Database persistence (PostgreSQL/MongoDB)
- User authentication
- Real-time availability updates
- Pickup scheduling and logistics coordination
- Payment integration
- Mobile app
- Geographic distance calculation
- Email notifications

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI Match Advisor | Yes |

## License

MIT

## Contributing


---

Built with by the ShellCycle team for a sustainable ocean future.
