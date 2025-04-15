document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    let isCapsLockActive = false;
    let isShiftActive = false;

    document.addEventListener('keydown', (event) => {
        const keyCode = event.code;
        const virtualKey = document.querySelector(`.key[data-key="${keyCode}"]`);

        if (virtualKey) {
            virtualKey.classList.add('active');
            setTimeout(() => virtualKey.classList.remove('active'), 100);

            if (keyCode === 'CapsLock') {
                isCapsLockActive = !isCapsLockActive;
                virtualKey.classList.toggle('active', isCapsLockActive);
            } else if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
                isShiftActive = true;
            } else if (keyCode === 'Backspace') {
                textInput.value = textInput.value.slice(0, -1);
            } else if (keyCode === 'Space') {
                textInput.value += ' ';
            } else if (keyCode === 'Enter') {
                textInput.value += '\n';
            } else if (!['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'Fn', 'ContextMenu'].includes(keyCode)) {
                let key = event.key;

                if (isCapsLockActive && key.length === 1) {
                    key = isShiftActive ? key.toLowerCase() : key.toUpperCase();
                } else if (isShiftActive && key.length === 1) {
                    key = key.toUpperCase();
                }

                textInput.value += key;
            }
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            isShiftActive = false;
        }
    });

    document.querySelectorAll('.key').forEach((key) => {
        key.addEventListener('click', () => {
            const keyCode = key.getAttribute('data-key');

            if (keyCode === 'CapsLock') {
                isCapsLockActive = !isCapsLockActive;
                key.classList.toggle('active', isCapsLockActive);
            } else if (keyCode === 'Backspace') {
                textInput.value = textInput.value.slice(0, -1);
            } else if (keyCode === 'Space') {
                textInput.value += ' ';
            } else if (keyCode === 'Enter') {
                textInput.value += '\n';
            } else if (!['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'Fn', 'ContextMenu'].includes(keyCode)) {
                let keyText = key.textContent.trim();

                if (isCapsLockActive) {
                    keyText = isShiftActive ? keyText.toLowerCase() : keyText.toUpperCase();
                } else if (isShiftActive) {
                    keyText = keyText.toUpperCase();
                }

                textInput.value += keyText;
            }
        });
    });
});