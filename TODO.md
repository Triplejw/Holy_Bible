# TODO

Working order, and the reasoning behind each step. Items under **Blocked** are
not being built until they are explicitly approved.

## Done

### Theme ramps and layout tokens — `context/ThemeContext.tsx`
**Why:** `primary` sat at 3.4:1 on the dark card and 3.6:1 on the dark
background, so verse numbers, active tab icons and every accent control failed
WCAG AA in dark mode; `secondary` was 1.4:1 on white and unusable as text. The
first fix cleared AA but was still seventeen unrelated hexes.
**How:** five ramps — one neutral, four hues — generated in OKLCH over one set
of lightness stops, so a step means the same thing in every ramp and the dark
theme is the light theme's steps inverted. Semantic tokens map to ramp steps;
nothing outside this file names a colour. Tightest text pair is 5.07:1.
Spacing, font size, line height and radius now sit in the same module as a
`tokens` export, so layout values stop being magic numbers.

### Hardcoded colours removed — splash, reader, drawer, chapter selector
**Why:** a hex inside `StyleSheet.create` cannot react to the theme, so the
light-grey `#E1E1E8` dividers glared on the dark background, the translucent
black chapter chips vanished on it, and the splash screen flashed white.
**How:** colours derived above each render return off the theme; the
stylesheets now hold structure only. `grep '#'` over `app/` and `components/`
returns nothing.

### Native bottom tabs — `app/(tabs)/_layout.tsx`
**Why:** a hardcoded 50pt height overrode React Navigation's own inset handling,
so the bar collided with the home indicator; and a JS-drawn bar never quite
matches the platform.
**How:** `expo-router/unstable-native-tabs` — a real `UITabBarController` on
iOS and Material tabs on Android, so the inset, the blur and the accessibility
behaviour are the system's. SF Symbols on iOS with Material vector icons as the
Android source. Four tabs: Home, Bible, Search, Settings.

### Screen layout convention
**Why:** each screen re-implemented its own shell, and the placeholder screens
were a bare `SafeAreaView` wrapped around a `Text` — disconnected from how
screens are built in `ctrelp/sources/mobile`, which is the reference.
**How:** ported that convention — no `SafeAreaView` anywhere, the scroll
container *is* the shell, `useSafeAreaInsets()` feeds `contentContainerStyle`
padding, and spacing comes off the shared scale. The reader keeps its pinned
header and nav bar but takes the top and bottom insets directly, which the
floating native tab bar now requires.

### Style extraction convention
**Why:** hoisting every style into a named const above the return moved the
reader around the file for no gain.
**How:** plain merges of a stylesheet entry and theme colours stay inline where
they are read; only a value carrying a decision — a ternary between colours, a
derived string — earns a name above the return.

### Splash lands on Home
**Why:** the app jumped straight into the reader, which leaves no room for a
home screen.
**How:** `router.replace('/(tabs)')` instead of `/(tabs)/bible`.

### Psalms verse data fix — `utils/bibleData.ts`
**Why:** `BIBLE_BOOKS` named the book `Psalms` while the verse data keyed it
`Psalm`, so all 150 chapters silently fell back to generated placeholder text.
**How:** the data key renamed to `Psalms`, keeping the display name correct and
matching the reference format used elsewhere.

## Blocked — awaiting approval

Two placeholder screens (`app/(tabs)/index.tsx`, `app/(tabs)/search.tsx`) exist
so the four-tab bar has no dead tabs. Each is a themed container with a heading
and nothing else. Their real content is below.

### Home screen
**Why:** the app opens straight into whatever chapter was last read, with no
surface for anything that is not the reader.
**How:** a resume card, a verse-of-the-day card, and search / Old Testament /
New Testament as cards below it — a card list that takes Devotional and Hymns
later without restructuring. No streaks.

### Verse of the day
**Why:** the home screen needs a daily anchor, and there is no network in the
app.
**How:** the calendar date seeds the pick, so it is chosen once per day, stays
fixed until midnight, and needs no storage or fetch.

### Search screen
**Why:** the Search tab is a placeholder, and 66 books are only reachable by
scrolling the drawer.
**How:** substring match over the bundled verse text, capped result count,
tapping a result opens that chapter in the reader.
