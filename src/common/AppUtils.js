
export const randomId = () => {
    var minm = 10000;
    var maxm = 99999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}

export const getRandomColor=()=> {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }