<script>
    import { onMount } from 'svelte';
    import { LayerCake, Svg } from 'layercake';
    import Line from './Line.svelte';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';


    /**
     * @typedef {Object} Heartrate
     * @property {Number} heartRate
     * @property {Number} timestamp
    */
    /**
     * @type {Heartrate[]}
     */
    let liveHeartRate = []

    onMount(() => {
        async function fetchData() {
            const resp = await fetch("https://advent.sveltesociety.dev/data/2023/day-four.json");
            const hr = await resp.json();
            liveHeartRate = [{...hr, timestamp: Date.now()}, ...liveHeartRate];
        };
        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    })
    $: liveHeartRate && console.log(liveHeartRate)
    
</script>

<div class="hrm-wrapper">
    <h1>Santa HRM</h1>
    <div class="avg-heartrate">
        Average Heart Rate: {(liveHeartRate.reduce((accum, curr) => accum + curr.heartRate, 0) / liveHeartRate.length).toFixed(0)}
    </div>
    <div class="chart-container">
        <LayerCake
            padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
            data={liveHeartRate}
            x={d => d.timestamp}
            y={d => d.heartRate}
            yDomain={[40, 150]}
        >
            <Svg>
                <AxisX/>
                <AxisY/>
                <Line/>
            </Svg>
        </LayerCake>
    </div>
</div>


<style>
    .hrm-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .chart-container {
        margin: 32px;
        padding: 32px;
        width: 90%;
        height: 300px;
    }
</style>