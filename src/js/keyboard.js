/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

class Keyboard {
    constructor() {
        this.elements = {
            main: null,
            textarea: null,
            keysContainer: null,
            keys: [],
        };
        this.properties = {
            value: '',
            isRussian: false,
            capslock: false,
        };
        this.keyLayout = [
            ['`', 'ё', 'Backquote'],
            ['1', '1', 'Digit1'],
            ['2', '2', 'Digit2'],
            ['3', '3', 'Digit3'],
            ['4', '4', 'Digit4'],
            ['5', '5', 'Digit5'],
            ['6', '6', 'Digit6'],
            ['7', '7', 'Digit7'],
            ['8', '8', 'Digit8'],
            ['9', '9', 'Digit9'],
            ['0', '0', 'Digit0'],
            ['-', '-', 'Minus'],
            ['=', '=', 'Equal'],
            ['Backspace', 'Backspace', 'Backspace'],
            ['Tab', 'Tab', 'Tab'],
            ['q', 'й', 'KeyQ'],
            ['w', 'ц', 'KeyW'],
            ['e', 'у', 'KeyE'],
            ['r', 'к', 'KeyR'],
            ['t', 'е', 'KeyT'],
            ['y', 'н', 'KeyY'],
            ['u', 'г', 'KeyU'],
            ['i', 'ш', 'KeyI'],
            ['o', 'щ', 'KeyO'],
            ['p', 'з', 'KeyP'],
            ['[', 'х', 'BracketLeft'],
            [']', 'ъ', 'BracketRight'],
            ['\\', '|', 'Backslash'],
            ['Del', 'Del', 'Delete'],
            ['CapsLock', 'CapsLock', 'CapsLock'],
            ['a', 'ф', 'KeyA'],
            ['s', 'ы', 'KeyS'],
            ['d', 'в', 'KeyD'],
            ['f', 'а', 'KeyF'],
            ['g', 'п', 'KeyG'],
            ['h', 'р', 'KeyH'],
            ['j', 'о', 'KeyJ'],
            ['k', 'л', 'KeyK'],
            ['l', 'д', 'KeyL'],
            [';', 'ж', 'Semicolon'],
            ["'", 'э', 'Quote'],
            ['Enter', 'Enter', 'Enter'],
            ['Shift', 'Shift', 'ShiftLeft'],
            ['z', 'я', 'KeyZ'],
            ['x', 'ч', 'KeyX'],
            ['c', 'с', 'KeyC'],
            ['v', 'м', 'KeyV'],
            ['b', 'и', 'KeyB'],
            ['n', 'т', 'KeyN'],
            ['m', 'ь', 'KeyM'],
            [',', 'б', 'Comma'],
            ['.', 'ю', 'Period'],
            ['/', '.', 'Slash'],
            ['▲', '▲', 'ArrowUp'],
            ['Shift', 'Shift', 'ShiftRight'],
            ['Ctrl', 'Ctrl', 'ControlLeft'],
            ['Win', 'Win', 'MetaLeft'],
            ['Alt', 'Alt', 'AltLeft'],
            ['Space', 'Space', 'Space'],
            ['Alt', 'Alt', 'AltRight'],
            ['◄', '◄', 'ArrowLeft'],
            ['▼', '▼', 'ArrowDown'],
            ['►', '►', 'ArrowRight'],
            ['Ctrl', 'Ctrl', 'ControlRight'],
        ];
    }


    initTextarea() {
        this.elements.textarea = document.createElement('textarea');
        this.elements.textarea.classList.add('window-enter');
        document.body.append(this.elements.textarea);
    }

    initVirtual() {
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keys');
        this.elements.keysContainer.append(this.createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.key');

        this.elements.main.append(this.elements.keysContainer);
        document.body.append(this.elements.main);


        if (this.properties.isRussian === false) {
            localStorage.setItem('lang', false);
        }

        if (this.properties.isRussian === true) {
            localStorage.setItem('lang', true);
        }
       
    }

    createKeys() {
        const fragment = document.createDocumentFragment();
        this.keyLayout.forEach((key) => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(key[2]) !== -1;

            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('key');
            keyElement.setAttribute('data-key', `${key[2]}`);

            switch (key[2]) {
            case 'Backspace':
                keyElement.classList.add('dark');
                keyElement.innerHTML = '<span>Backspace</span>';
                keyElement.addEventListener('click', () => {
                    const a = this.getCaretPos();
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value = this.properties.value.split('');
                    this.properties.value.splice(this.getCaretPos() - 1, 1);
                    this.properties.value = this.properties.value.join('');
                    document.querySelector('.window-enter').value = this.properties.value;
                    this.set(document.querySelector('.window-enter'), a - 1, a - 1);
                });
                break;

            case 'Tab':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Tab</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '\t';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'CapsLock':
                keyElement.classList.add('dark');
                keyElement.innerHTML = '<span>CapsLock</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'Enter':
                keyElement.classList.add('dark');
                keyElement.innerHTML = '<span>Enter</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '\n';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'ShiftLeft':
                keyElement.classList.add('dark');
                keyElement.innerHTML = '<span>Shift</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'ShiftRight':
                keyElement.classList.add('dark');
                keyElement.innerHTML = '<span>Shift</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'ControlLeft':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Ctrl</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'ControlRight':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Ctrl</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'AltLeft':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Alt</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'AltRight':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Alt</span>';
                keyElement.addEventListener('click', () => {
                    this.toggleCapsLock();
                });
                break;

            case 'Space':
                keyElement.classList.add('space');
                keyElement.innerHTML = '<span> <br>  </span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += ' ';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'MetaLeft':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Win</span>';
                break;

            case 'ArrowUp':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>▲</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '▲';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'ArrowLeft':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>◄</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '◄';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'ArrowDown':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>▼</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '▼';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;

            case 'ArrowRight':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>►</span>';
                keyElement.addEventListener('click', () => {
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value += '►';
                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;
            case 'Delete':
                keyElement.classList.add('dark-small');
                keyElement.innerHTML = '<span>Del</span>';
                keyElement.addEventListener('click', () => {
                    const a = this.getCaretPos();
                    this.properties.value = document.querySelector('.window-enter').value;
                    this.properties.value = this.properties.value.split('');
                    this.properties.value.splice(this.getCaretPos(), 1);
                    this.properties.value = this.properties.value.join('');
                    document.querySelector('.window-enter').value = this.properties.value;
                    this.set(document.querySelector('.window-enter'), a, a);
                });
                break;

            default: {
                const a = key[0];
                const b = key[1];
                let lenguageLetter;
                
                if (!this.properties.isRussian) {
                    lenguageLetter = a;
                } else {
                    lenguageLetter = b;
                }
    
                keyElement.textContent = lenguageLetter.toLowerCase();
                keyElement.addEventListener('click', () => {
                    if (this.properties.capsLock) {
                        this.properties.value = document.querySelector('.window-enter').value;
                        this.properties.value += lenguageLetter.toUpperCase();
                    } else {
                        this.properties.value = document.querySelector('.window-enter').value;
                        this.properties.value += lenguageLetter.toLowerCase();
                    }

                    document.querySelector('.window-enter').value = this.properties.value;
                });
                break;
            }
            }
            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        });
        return fragment;
    }

    toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        this.elements.keys.forEach((key) => {
            const myKey = key;
            if (myKey.childElementCount === 0) {
                if (this.properties.capsLock) {
                    myKey.textContent = myKey.textContent.toUpperCase();
                } else {
                    myKey.textContent = myKey.textContent.toLowerCase();
                }
            }
        });
    }

    set(ctrl, start, end) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        }
    }

    getCaretPos() {
        const obj = document.querySelector('.window-enter');
        obj.focus();
        if (document.selection) {
            const sel = document.selection.createRange();
            const clone = sel.duplicate();
            sel.collapse(true);
            clone.moveToElementText(obj);
            clone.setEndPoint('EndToEnd', sel);
            return clone.text.length;
        }
        if (obj.selectionStart !== false) return obj.selectionStart;
        return 0;
    }

    initReal() {
        document.addEventListener('keydown', (event) => {
            const key = document.querySelector(`button[data-key='${event.code}']`);
            const a = this.getCaretPos();
            event.preventDefault();
            switch (event.code) {
            case 'Backspace':
                this.properties.value = document.querySelector('.window-enter').value;
                this.properties.value = this.properties.value.split('');
                this.properties.value.splice(this.getCaretPos() - 1, 1);
                this.properties.value = this.properties.value.join('');
                document.querySelector('.window-enter').value = this.properties.value;
                this.set(document.querySelector('.window-enter'), a - 1, a - 1);
                break;

            case 'Tab':
                this.properties.value = document.querySelector('.window-enter').value;
                this.properties.value += '\t';
                document.querySelector('.window-enter').value = this.properties.value;
                break;

            case 'CapsLock':
                this.toggleCapsLock();
                break;

            case 'Enter':
                document.querySelector('.window-enter').value += '\n';
                break;

            case 'ShiftLeft':
                this.toggleCapsLock();
                break;

            case 'ControlLeft':
                this.toggleCapsLock();
                break;
            case 'ControlRight':
                this.toggleCapsLock();
                break;
            case 'AltLeft':
                this.toggleCapsLock();
                break;
            case 'AltRight':
                this.toggleCapsLock();
                break;

            case 'Space':
                document.querySelector('.window-enter').value += ' ';
                break;

            case 'Delete':
                this.properties.value = document.querySelector('.window-enter').value;
                this.properties.value = this.properties.value.split('');
                this.properties.value.splice(this.getCaretPos(), 1);
                this.properties.value = this.properties.value.join('');
                document.querySelector('.window-enter').value = this.properties.value;
                this.set(document.querySelector('.window-enter'), a, a);
                break;

            default:
                console.log(this.properties.isRussian);
                console.log(this.properties.storage);
             
                this.keyLayout.forEach((item) => {
                    if (item[2] === event.code) {
                        if (!this.properties.isRussian) {
                            if (!this.properties.capsLock) {
                                document.querySelector('.window-enter').value += item[0].toLowerCase();
                            }
                            if (this.properties.capsLock) {
                                document.querySelector('.window-enter').value += item[0].toUpperCase();
                            }
                        } else {
                            if (!this.properties.capsLock) {
                                document.querySelector('.window-enter').value += item[1].toLowerCase();
                            }
                            if (this.properties.capsLock) {
                                document.querySelector('.window-enter').value += item[1].toUpperCase();
                            }
                        }
                    }
                });
            }
            key.classList.add('active');
        });
        document.addEventListener('keyup', (event) => {
            const key = document.querySelector(`button[data-key='${event.code}']`);
            if (event.code === 'ShiftLeft') {
                this.toggleCapsLock();
            }
            key.classList.remove('active');
        });

        function runOnKeys(func, ...codes) {
            const pressed = new Set();

            document.addEventListener('keydown', (event) => {
                pressed.add(event.code);

                for (let i = 0; i < codes.length; i += 1) {
                    if (!pressed.has(codes[i])) {
                        return;
                    }
                }

                pressed.clear();
                func();
            });

            document.addEventListener('keyup', (event) => {
                pressed.delete(event.code);
            });
        }

        runOnKeys(
            () => {
                setTimeout(() => {
                    this.properties.isRussian = !this.properties.isRussian;
                    document.querySelector('.keyboard').remove();
                    this.initVirtual();
                }, 100);
            },
            'ControlLeft',
            'AltLeft',
        );
    }

}
const keyboard = new Keyboard();

window.addEventListener('DOMContentLoaded', () => {
    // keyboard.language();
    keyboard.initTextarea();
    keyboard.initVirtual();
    keyboard.initReal();
});


const title = document.createElement('div');
title.classList.add('title');
title.innerHTML = 'RSS Virtual Keyboard';
document.body.prepend(title);

const instruction = document.createElement('div');
instruction.classList.add('instruction');
instruction.innerHTML = `Клавиатура создана в ОС Windows <br>
     Для переключения языка комбинация: левыe ctrl + alt`;
document.body.after(instruction);
