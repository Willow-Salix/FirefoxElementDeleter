document.addEventListener('click', function() {
    // Change this selector to target the desired element
    const elementToDelete = document.querySelector('#element-to-delete');
    if (elementToDelete) {
        elementToDelete.remove();
    }
});

browser.runtime.onMessage.addListener((message) => {
    if (message.action === "deleteElement") {
        // Change this selector to target the desired element
        const elementToDelete = document.querySelector('#element-to-delete');
        if (elementToDelete) {
            elementToDelete.remove();
        }
    } else if (message.action === "enableClickListener") {
        // Change cursor to crosshair using crosshair006.png reference
        document.body.style.cursor = 'url("crosshair006.png"), auto';
        // Ensure scrolling is unlocked
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';

        // Define mouseover/mouseout handlers to outline hovered element
        let prevElement = null;
        const onMouseOver = (event) => {
            if (prevElement && prevElement !== event.target) {
                prevElement.style.outline = '';
            }
            event.target.style.outline = '2px dashed red';
            prevElement = event.target;
        };
        const onMouseOut = (event) => {
            event.target.style.outline = '';
            if (prevElement === event.target) {
                prevElement = null;
            }
        };
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mouseout', onMouseOut);

        // Listen for one click to delete the clicked element and cleanup event listeners
        document.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            const target = event.target;
            if (target) {
                target.remove();
            }
            // Restore default cursor style
            document.body.style.cursor = '';
            // Remove outline event listeners
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseout', onMouseOut);
        }, { once: true });
    }
});