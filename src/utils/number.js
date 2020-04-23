
export function separateByThousands(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, `.`);
}

//console.log(separateByThousands('1234567', '.'));

