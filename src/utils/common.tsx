export const toKMBT = (val : number) => {
        
    if (val >= 1_000_000_000_000) {

        // 조 (Trillion)
        return parseFloat((val / 1_000_000_000_000).toFixed(2)) + 'T'; 

    } else if (val >= 1_000_000_000) {
        
        // 십억 (Billion)
        return parseFloat((val / 1_000_000_000).toFixed(2)) + 'B'; 

    } else if (val >= 1_000_000) {
        
        //  백만 (Million)
        return parseFloat((val / 1_000_000).toFixed(2)) + 'M';

    } else if (val >= 1_000) {
        
        // 천 (Thousand)
        return parseFloat((val / 1_000).toFixed(2)) + 'K'; 

    } else {
        
        return parseFloat(val.toFixed(2)).toString();
    }
}