export const Secs2Time = time => {
    let hours = Math.floor(time / 60 / 60 % 60);
    let minutes = Math.floor(time / 60 % 60);
    let seconds = Math.floor(time % 60);
    
    return (`${hours != 0 ? `${ZeroToLeft(hours)}:` : ""}${ZeroToLeft(minutes)}:${ZeroToLeft(seconds)}`);
}

const ZeroToLeft = (number, minLength = 1) => {
    number = number.toString();
    if (number.length == minLength) return `0${number}`;
    return number;
}

export const Secs2Minutes = time => {
    let minutes = Math.ceil(time / 60);

    return minutes;
}

export const DateFormat = date => new Date(Date.parse(date)).toLocaleDateString("pt-BR");

export const SecondsFormat = seconds => {
    if (seconds >= 60) {
        let minutes = ~~(seconds / 60);
        if (minutes >= 60) {
            let hours = ~~(minutes / 60);
            if (hours >= 24) {
                let days = ~~(hours / 24);
                if (days >= 30) {
                    let months = ~~(days / 30);
                    if (months >= 12) {
                        let years = ~~(months / 12);
                        return `${years}ano(s)`;
                    }
                    return `${months}mês(es)`;
                }
                return `${days}d`;
            }
            return `${hours}h`;
        }
        return `${minutes}min`
    }
    return `${~~seconds}s`;
}