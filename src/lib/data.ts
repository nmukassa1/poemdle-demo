import type { ArchiveEntry, Poem, Prompt, TodayResponse } from "@/types/api";

export const aliasOptions = [
  "gentle-willow",
  "dusk-orchard",
  "little-harbor",
  "open-letter",
  "warm-stone",
] as const;

export const todayPrompt: Prompt = {
  id: "prompt-024",
  dayNumber: 24,
  title: "The things we never said.",
  description:
    "Write a poem about the words that stayed with you — the ones you never said, but still think about.",
  date: "2026-10-22",
  characterLimit: 280,
  status: "open",
  closesAt: "2026-10-22T22:59:59.000Z",
};

export const todayPoems: Poem[] = [
  {
    id: "poem-violet-ash",
    promptId: todayPrompt.id,
    authorAlias: "violet-ash",
    createdAt: "2026-10-22T07:12:00.000Z",
    content: `I kept your name like a coin
in the lining of my coat,
spent it only in my sleep.

Some mornings I almost said it
to the kettle, to the dog,
to the window fogging over,

but a word that long unspoken
learns to live without a mouth.`,
  },
  {
    id: "poem-tidal-moss",
    promptId: todayPrompt.id,
    authorAlias: "tidal-moss",
    createdAt: "2026-10-22T08:04:00.000Z",
    content: `There were words I rehearsed
on the bus, in the sink,
and not one survived the door.

I still practise them sometimes,
mouth closed, counting the stops,
as if rehearsal were a kind of mercy.`,
  },
  {
    id: "poem-amber-wren",
    promptId: todayPrompt.id,
    authorAlias: "amber-wren",
    createdAt: "2026-10-22T08:41:00.000Z",
    content: `Some silences are shaped
exactly like a person.

I walk around mine carefully,
the way you pass a sleeping house.`,
  },
  {
    id: "poem-paper-moon",
    promptId: todayPrompt.id,
    authorAlias: "paper-moon",
    createdAt: "2026-10-22T09:18:00.000Z",
    content: `I wrote it in the steam
and watched the glass forget.

The sentence was only
I am still here.
It lasted as long as the kettle.`,
  },
  {
    id: "poem-quiet-harbor",
    promptId: todayPrompt.id,
    authorAlias: "quiet-harbor",
    createdAt: "2026-10-22T10:02:00.000Z",
    content: `You asked what I was thinking
and I handed you the weather.

Later, alone, I said the true thing
to the dark side of a cup
and rinsed it out.`,
  },
  {
    id: "poem-cedar-light",
    promptId: todayPrompt.id,
    authorAlias: "cedar-light",
    createdAt: "2026-10-22T11:27:00.000Z",
    content: `Forgive me
was finished in my mouth
and never travelled.

It sat between my teeth
all winter, a small stone
warmed by lying.`,
  },
  {
    id: "poem-slow-river",
    promptId: todayPrompt.id,
    authorAlias: "slow-river",
    createdAt: "2026-10-22T12:15:00.000Z",
    content: `I meant to tell you
the pear tree survived.

Instead I sent a photograph
of the street, and you replied
looks cold, and it was,
and the pears went on without us.`,
  },
  {
    id: "poem-milk-glass",
    promptId: todayPrompt.id,
    authorAlias: "milk-glass",
    createdAt: "2026-10-22T13:06:00.000Z",
    content: `There is a sentence
I only know in kitchens.

It begins with your hands
and ends before I can
make it polite.`,
  },
  {
    id: "poem-north-window",
    promptId: todayPrompt.id,
    authorAlias: "north-window",
    createdAt: "2026-10-22T14:22:00.000Z",
    content: `I almost called.
The phone lit my face
and I put the light away.

Some news belongs
to the person who left,
and I was not brave enough
to be that person.`,
  },
  {
    id: "poem-soft-thunder",
    promptId: todayPrompt.id,
    authorAlias: "soft-thunder",
    createdAt: "2026-10-22T15:48:00.000Z",
    content: `Say it, say it,
the radiator knocked.

I told the room a smaller truth
and went to bed
still holding the large one.`,
  },
  {
    id: "poem-linen-bird",
    promptId: todayPrompt.id,
    authorAlias: "linen-bird",
    createdAt: "2026-10-22T16:33:00.000Z",
    content: `Mother, I kept the blue bowl.
I never said it matched
the chip on your favourite cup.

They sit in my cupboard now
like two people who almost
touched hands.`,
  },
  {
    id: "poem-salt-air",
    promptId: todayPrompt.id,
    authorAlias: "salt-air",
    createdAt: "2026-10-22T18:05:00.000Z",
    content: `At the end of the platform
I had three words ready.

The doors closed on the second.
The third I still carry,
lighter than a ticket
and just as used.`,
  },
];

const archivePrompt = (
  dayNumber: number,
  title: string,
  description: string,
  date: string,
): Prompt => ({
  id: `prompt-${String(dayNumber).padStart(3, "0")}`,
  dayNumber,
  title,
  description,
  date,
  characterLimit: 280,
  status: "closed",
  closesAt: `${date}T22:59:59.000Z`,
});

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "archive-023",
    prompt: archivePrompt(
      23,
      "What the rain kept.",
      "Write about something the weather remembered longer than you did.",
      "2026-10-21",
    ),
    winningPoem: {
      id: "winner-023",
      promptId: "prompt-023",
      authorAlias: "glass-orchard",
      createdAt: "2026-10-21T19:12:00.000Z",
      content: `The rain kept your umbrella
and gave it back to a stranger.

I watched from the bakery window,
hands around a cup,
practising your name
until the street was only water.`,
    },
  },
  {
    id: "archive-022",
    prompt: archivePrompt(
      22,
      "A door left open.",
      "Write about a leaving that never quite finished.",
      "2026-10-20",
    ),
    winningPoem: {
      id: "winner-022",
      promptId: "prompt-022",
      authorAlias: "hedge-light",
      createdAt: "2026-10-20T18:40:00.000Z",
      content: `You left the door on the latch
as if the night were a guest
still deciding.

I slept in my coat.
By morning the hallway
had learned your shape
and would not give it back.`,
    },
  },
  {
    id: "archive-021",
    prompt: archivePrompt(
      21,
      "Letters we never sent.",
      "Write the letter you folded and kept.",
      "2026-10-19",
    ),
    winningPoem: {
      id: "winner-021",
      promptId: "prompt-021",
      authorAlias: "ink-moth",
      createdAt: "2026-10-19T17:05:00.000Z",
      content: `Dear you of the blue stairs,

I am well enough.
The plant lived.
I did not say the rest,
so the rest is still true
and still in the drawer
beneath the stamps.`,
    },
  },
  {
    id: "archive-020",
    prompt: archivePrompt(
      20,
      "The kitchen at midnight.",
      "Write about a room that knows you better than anyone.",
      "2026-10-18",
    ),
    winningPoem: {
      id: "winner-020",
      promptId: "prompt-020",
      authorAlias: "oven-bird",
      createdAt: "2026-10-18T23:16:00.000Z",
      content: `The kitchen keeps my secrets
in the hum of the fridge.

At midnight I stand in the dark
and eat a peach over the sink,
and the room, faithful,
does not turn the light on.`,
    },
  },
  {
    id: "archive-019",
    prompt: archivePrompt(
      19,
      "The last light on.",
      "Write about the light you leave for someone else.",
      "2026-10-17",
    ),
    winningPoem: {
      id: "winner-019",
      promptId: "prompt-019",
      authorAlias: "porch-gold",
      createdAt: "2026-10-17T21:28:00.000Z",
      content: `I leave the landing light on
though you live in another city.

It makes a small moon
of the stair.
If you ever come back late,
the house will look awake.`,
    },
  },
];

export const todayResponse: TodayResponse = {
  prompt: todayPrompt,
  player: {
    hasSubmitted: false,
    ownPoemId: null,
    alias: aliasOptions[0],
    votesAllowed: 5,
    votesRemaining: 5,
    canVote: true,
  },
};
