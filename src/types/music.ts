import { z } from "zod";

const musicEntry = z.object({
    Title: z.string(),
    Artist: z.string(),
    PathResource: z.string(),
    SongOrder: z.number()
})

const todaysSelection = z.object({
    CuratorName: z.string(),
    CuratorDescription: z.string(),
    MusicEntries: z.array(musicEntry)
})


export type MusicEntry = z.infer<typeof musicEntry>
export type TodaysSelection = z.infer<typeof todaysSelection>
