
export const load = async () => {
    const resp = await fetch("https://advent.sveltesociety.dev/data/2023/day-three.json")
    const presents = await resp.json()
    return {
        presents
    }
}
