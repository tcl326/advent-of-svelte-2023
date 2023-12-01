
export const load = async () => {
    const resp = await fetch("https://advent.sveltesociety.dev/data/2023/day-one.json")
    const tallies = await resp.json()
    return {
        tallies
    }
}