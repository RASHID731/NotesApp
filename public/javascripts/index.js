const colorInput = document.querySelector('#colorInput');

colorInput.addEventListener('input', (e) => {
	const colorLabel = e.target.labels[0].children[0];
	colorLabel.style.backgroundColor = e.target.value;
});