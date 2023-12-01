<script>
	import Add from 'virtual:icons/material-symbols/add';
	import Remove from 'virtual:icons/material-symbols/remove';

	/**
	 * A Tally that keep tracks of how 'naughty' or 'nice' a child has been in 2023
	 * @typedef {Object} Tally
	 * @property {String} name
	 * @property {Number} tally
	 */

	export let data;

    /**
     * @type {HTMLFormElement}
     */
    let form;

	/**
	 * @type {Tally[]}
	 */
	let tallies = data.tallies;

	/**
	 * @param {String} name
	 * @param {Number} amount
	 */
	function change(name, amount) {
		let changed = false;
		for (let i = 0; i < tallies.length; i++) {
			if (tallies[i].name === name) {
				tallies[i].tally += amount;
				changed = true;
			}
		}
		if (!changed) {
			console.log('name: ', name, 'does not exist');
		}
	}

	/**
	 * @param {SubmitEvent} event
	 */
	function handleSubmit(event) {
        // @ts-ignore
        const formData = new FormData(event.target);

        /**
         * @type {Tally}
        */
        const item = Object.fromEntries(formData);
        tallies.push(item);
        tallies = tallies;

        form.reset();
    }
	console.log(data);
</script>

<h1>Tally</h1>

<div class="tally-options">
	<form on:submit={handleSubmit} bind:this={form}>
		<label for="name">Name:</label>
		<input type="text" name="name" value="" />
		<label for="name">Tally:</label>
		<input type="number" name="tally" value="" />
		<button type="submit"> Add child </button>
	</form>
</div>

<div class="tally-wrapper">
	<table>
		<tr>
			<th>Name</th>
			<th>Tally</th>
			<th>Status</th>
		</tr>
		{#if tallies}
			{#each tallies as tally, index}
				<tr>
					<td class="name">{tally.name}</td>
					<td class="tally">
						<button
							on:click={() => {
								change(tally.name, 1);
							}}><Add /></button
						>
						<p>{tally.tally}</p>
						<button
							on:click={() => {
								change(tally.name, -1);
							}}><Remove /></button
						>
					</td>
					<td class="status">
						{#if tally.tally >= 0}
							Nice
						{:else}
							Naughty
						{/if}
					</td>
				</tr>
			{/each}
		{/if}
	</table>
</div>

<style>
	.tally {
		display: flex;
		justify-content: space-between;
	}
	table button {
		border-width: 0;
	}
	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}
	/* .tally  */
</style>
