export const maskCpfCnpj = (text) => {
    let text2 = text.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');

    let final_num = '';
    if (text2.length <= 11) {
        for (let i = 0; i < text2.length && i < 11; i++) {
            if (!isNaN(text2[i])) {
                if (i == 3) {
                    final_num += '.' + text2[i];
                }
                else if (i == 6) {
                    final_num += '.' + text2[i];
                }
                else if (i == 9) {
                    final_num += '-' + text2[i];
                }
                else {
                    final_num += text2[i] + '';
                }
            }
        }
    }
    else {
        // 35.590.099/0001-03
        for (let i = 0; i < text2.length && i < 14; i++) {
            if (!isNaN(text2[i])) {
                if (i == 2) {
                    final_num += '.' + text2[i];
                }
                else if (i == 5) {
                    final_num += '.' + text2[i];
                }
                else if (i == 8) {
                    final_num += '/' + text2[i];
                }
                else if (i == 12) {
                    final_num += '-' + text2[i];
                }
                else {
                    final_num += text2[i] + '';
                }
            }
        }
    }

    return final_num;
    // this.setState({ cpf: final_num });
}

export const maskCnpj = (text) => {
    let text2 = text.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');
    let final_num = '';

    // 35.590.099/0001-03
    for (let i = 0; i < text2.length && i < 14; i++) {
        // if (Number.isInteger(text[i])) {
        if (!isNaN(text2[i])) {

            if (i == 2) {
                final_num += '.' + text2[i];
            }
            else if (i == 5) {
                final_num += '.' + text2[i];
            }
            else if (i == 8) {
                final_num += '/' + text2[i];
            }
            else if (i == 12) {
                final_num += '-' + text2[i];
            }
            else {
                final_num += text2[i] + '';
            }
        }
    }



    return final_num;
    // this.setState({ cpf: final_num });
}

export const maskNascimento = (text) => {
    let text2 = text.replace('/', '').replace('/', '');

    let final_num = '';

    for (let i = 0; i < text2.length && i < 8; i++) {
        // if (Number.isInteger(text[i])) {
        if (i == 2) {
            final_num += '/' + text2[i];
        }
        else if (i == 4) {
            final_num += '/' + text2[i];
        }
        else {
            final_num += text2[i] + '';
        }
        // }
    }
    return final_num;
}
export const maskDatas = (text) => {
    let text2 = text.replace(/(\d*)-(\d*)-(\d*).*/, '$3/$2/$1');
    return text2;
}

export const maskTelefone = (text) => {
    let text2 = text.replace('(', '').replace(')', '').replace(' ', '').replace('-', '');
    let final_num = '';

    for (let i = 0; i < text2.length && i < 11; i++) {
        // if (Number.isInteger(text[i])) {
        if (!isNaN(text2[i])) {

            if (i == 0) {
                final_num += '(' + text2[i];
            }
            else if (i == 2) {
                final_num += ') ' + text2[i];
            }
            else if (i == 6 && text2.length <= 10) {

                final_num += '-' + text2[i];
            }
            else if (i == 7 && text2.length >= 11) {
                final_num += '-' + text2[i];
            }
            else {
                final_num += text2[i] + '';
            }
        }
    }
    return final_num;
}

export const maskRg = (text) => {
    let text2 = text.replace('.', '').replace('-', '').replace('.', '');

    let final_num = '';

    for (let i = 0; i < text2.length && i < 9; i++) {
        // if (Number.isInteger(text[i])) {
        if (i == 2) {
            final_num += '.' + text2[i];
        }
        else if (i == 5) {
            final_num += '.' + text2[i];
        }
        else if (i == 8) {
            final_num += '-' + text2[i];
        }
        else {
            final_num += text2[i] + '';
        }
        // }
    }
    return final_num;
    // this.setState({ cpf: final_num });
}

export const maskCep = (text) => {
    let text2 = text.replace('-', '');


    let final_num = '';

    for (let i = 0; i < text2.length && i < 8; i++) {
        // if (Number.isInteger(text[i])) {
        if (!isNaN(text2[i])) {

            if (i == 5) {
                final_num += '-' + text2[i];
            }
            else {
                final_num += text2[i] + '';
            }
        }
        // }
    }
    return final_num;
    // this.setState({ cep: final_num });

}

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

export const maskPrice = (text) => {
    if (!text) return text;

    text = text.replace(',', '');
    text = text.replace(/\./g, '');

    text = text.replace('R', '');
    text = text.replace('$', '');

    text = text.replace(' ', '');
    let text2 = text;
    text = reverseString(text);
    let final_num = '';

    let minus = 4;
    for (let i = 0; i < text.length; i++) {
        if (isNaN(text[i])) {
            continue;
        }
        // if (Number.isInteger(text[i])) {
        if (i == 1 && i != text.length - 1) {
            final_num += text[i] + ',';
        }
        else if (i == minus && i != text.length - 1) {
            final_num += text[i] + '.';
            minus += 3;

        }
        else {
            final_num += text[i] + '';
        }
        // }
    }
    final_num = reverseString(final_num);
    if (text.length != 0)
        if(parseFloat(text2)>=0){
            final_num = 'R$ ' + final_num;
        }
        else{
            final_num = 'R$ -' + final_num;
        }
    // if(final_num.length==1){
    //     final_num+='R$ 00.0'+final_num;
    // }
    // else if(final_num==2){
    //     final_num+='R$ 00.'+final_num;
    // }
    // else{
    //     final_num+='R$ '+final_num;
    // }
    return final_num;
}


export const maskNumber = (text2) => {


    let final_num = '';
    text2 = text2.replace(',', '')
    for (let i = 0; i < text2.length; i++) {
        if (!isNaN(text2[i]) || (text2[i] == '.' && !final_num.includes('.'))) {
            final_num += text2[i] + '';
        }
    }
    return final_num;
}

export const maskNumber1 = (text2) => {


    let final_num = '';
    text2 = text2.replace(',', '')
    for (let i = 0; i < text2.length; i++) {
        if (!isNaN(text2[i]) && text2[i]!=0|| (text2[i] == '.' && !final_num.includes('.'))) {
            final_num += text2[i] + '';
        }
    }
    return final_num;
}

export const maskDouble = (text) => {


    let text2 = text.replace(',', '');
    text2 = text2.replace('.', '');


    text2 = text2.replace(' ', '');
    console.log(text2);

    text2 = parseFloat(text2).toString();
    console.log(text2);
    let final_num = '';

    if (text2.length == 1) {
        if (!isNaN(text2[0])) {
            final_num += '0,0' + text2[0];
        }
    }
    else if (text2.length == 2) {
        if (!isNaN(text2[0]) && !isNaN(text2[1])) {
            final_num += '0,' + text2[0] + text2[1];
        }
    }
    else {
        for (let i = 0; i < text2.length; i++) {
            if (!isNaN(text2[i])) {
                if (i == text2.length - 3) {
                    final_num += text2[i] + ',';
                }
                else {
                    final_num += text2[i] + '';
                }
            }
        }
    }

    return final_num;
}

export const maskPercent = (text2) => {


    let final_num = '';
    // text2 = text2.replace(',', '').replace('.', '')
    for (let i = 0; i < text2.length; i++) {
        if (!isNaN(text2[i]) || (text2[i] == '.' && !final_num.includes('.'))) {
            final_num += text2[i] + '';
        }
    }
    // final_num+='%';
    return final_num;
}


export const maskCpf = (text) => {
    let text2 = text.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');

    let final_num = '';
    for (let i = 0; i < text2.length && i < 11; i++) {
        if (!isNaN(text2[i])) {
            if (i == 3) {
                final_num += '.' + text2[i];
            }
            else if (i == 6) {
                final_num += '.' + text2[i];
            }
            else if (i == 9) {
                final_num += '-' + text2[i];
            }
            else {
                final_num += text2[i] + '';
            }
        }
    }


    return final_num;
    // this.setState({ cpf: final_num });
}