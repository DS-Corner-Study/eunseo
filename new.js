let count=0;
const ci=setInterval(() => {
  count++;
  console.log('1초 지남'+count);
  if(count==3)
  clearImmediate(ci)
}, 1000);