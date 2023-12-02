<script>
	import { fade, fly } from "svelte/transition";
    import ExpressionlessFace from 'virtual:icons/noto/expressionless-face';
    import FaceWithRasedEyebrow from 'virtual:icons/noto/face-with-raised-eyebrow';
    import FaceWithOpenMouth from 'virtual:icons/noto/face-with-open-mouth';
    import PartyingFace from 'virtual:icons/noto/partying-face';
    import SantaClaus from 'virtual:icons/noto/santa-claus';

    let cookieCount = 0;
    let mousedownTimer = 0;
    let intervalId;
    let timeoutId;
    let iconSize = "128px";

    /**
     * 
     * @param {Number} amount
     */
    function handleMouseDown(amount) {
        mousedownTimer = 0;
        timeoutId = setTimeout(
            () => {
                intervalId = setInterval(() => {
                    cookieCount += amount;
                    if (cookieCount < 0) {
                        cookieCount = 0;
                    }
                }, 10);
            },
            1000,
        );
    }

    function handleMouseUp(){
        console.log("mouseup", timeoutId, intervalId)
        clearTimeout(timeoutId);
        clearInterval(intervalId);
    }
</script>

<div class="wrapper">
    <div class="display">
        <div class="expression">
            {#if cookieCount < 30}
                <ExpressionlessFace style="font-size:{iconSize}"/>
            {:else if cookieCount < 60}
                <FaceWithRasedEyebrow style="font-size:{iconSize}"/>
            {:else if cookieCount < 120}
                <FaceWithOpenMouth style="font-size:{iconSize}"/>
            {:else if cookieCount < 240}
                <PartyingFace style="font-size:{iconSize}"/> 
            {:else}
                <SantaClaus style="font-size:{iconSize}"/>
            {/if}
        </div>
        <!-- <div class="count" style="font-size:{iconSize}">
            {cookieCount}
        </div> -->
    </div>
    <div class="control">
        <button on:click={() => {cookieCount++}} on:mousedown={() => {handleMouseDown(1)}} on:mouseup={handleMouseUp}>Add</button>
        <button on:click={() => {if (cookieCount > 0) {cookieCount--}}} on:mousedown={() => {handleMouseDown(-1)}} on:mouseup={handleMouseUp}>Remove</button>
        <button on:click={() => {cookieCount = 0}}>Reset</button>
    </div>
    <div class="cookies">
        <ul>
            {#each {length: cookieCount} as _, i}
                <img
                    width="30px"
                    height="30px"
                    src="/santa-cookies.png"
                    alt="cookie"
                    in:fly={{ delay: 250, duration: 300, x: 100 }}
                    out:fade
                />
            {/each}
        </ul>
    </div>
</div>


<style>
    .wrapper {
        padding: 32px 0;
        background-color: rgb(236 254 255);
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .display {
        display: flex;
    }

    .cookies {
        padding: 32px;
        margin-right: 30px;
        align-self: flex-start;

    }
</style>