<script>
    import RemoveSelection from 'virtual:icons/material-symbols/remove-selection';
    /**
     * A Present
     * @typedef {Object} Present
     * @property {String} name
     * @property {Number} weight
     */

    export let data;

    /**
     * @type {Present[]}
    */
    let presents = data.presents

    /**
     * @type {Number[]}
     */
    let inSleigh = []

    /**
     * @type {Number}
     */
    let weight = 0
    
    /**
     * 
     * @param {DragEvent} event
     * @param {Number} index
     */
    function handleDragstart(event, index) {
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
        event.dataTransfer?.setData("text/plain", index.toString())

        console.log("drag started")
    }

    /**
     * 
     * @param {DragEvent} event
     */
    function handleDrop (event) {
        const index = event.dataTransfer?.getData("text/plain") || '';
        if (weight + presents[parseInt(index)].weight > 100) {
            alert("The Sleigh is too heavy, can't carry more gifts!")
            return
        }
        inSleigh = [...inSleigh, parseInt(index)];
        console.log(event)
    }


    function handleRemove(event, index) {
        const indexToRemove = inSleigh.indexOf(index);
        if (indexToRemove > -1) {
            inSleigh.splice(indexToRemove, 1);
            inSleigh = inSleigh;
        }
        
    }

    $: weight = inSleigh.reduce((acc, curr) => {return acc + presents[curr].weight}, 0)
    // console.log(presents)
</script>

<div class="sleigh-wrapper">
    <div class="weight">
        <h2>{weight.toFixed(2)}</h2>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        id="sleigh"
        class="sleigh"
        on:drop={handleDrop}
        on:dragover|preventDefault={() => {return false}}
    >
    {#each presents as present, i}
        {#if inSleigh.includes(i)}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="present in-sleigh"
                id={present.name}
                on:click={
                    (e) => {handleRemove(e, i)}
                }
            >
                {present.name}
        </div> 
        {/if}
    {/each}
    </div>
</div>

<div class=present-wrapper>
    {#each presents as present, i}
        {#if !inSleigh.includes(i)}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class=present
                id={present.name}
                draggable=true
                on:dragstart={
                    (e) => {handleDragstart(e, i)}
                }
            >
                {present.name}
            </div>
        {/if}
    {/each}
</div>

<style>
    .sleigh-wrapper {
        margin: 32px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .sleigh {
        border: 2px solid red;
        border-radius: 16px;
        min-height: 100px;
        min-width: 400px;
        align-self: center;
        display: flex;
        flex-wrap: wrap;
    }

    .sleigh:hover {
        background-color: coral;
    }

    .in-sleigh img{
        display: none;
    }

    .in-sleigh:hover img{
        /* display */
    }

    .present {
        /* background-color: gray; */
        width: fit-content;
        border-radius: 4%;
        padding: 16px 16px;
        margin: 8px;
        border: 1px solid black;
        cursor: pointer;
    }

    .present:hover {
        background-color: orange;
    }

    .present-wrapper {
        display: flex;
        flex-wrap: wrap;
    }
</style>