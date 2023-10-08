const a = true;
if (a) {
    const m1 = await import('../ES/func.mjs');
    console.log(m1);
    const m2 = await import('../ES/var.mjs');
    console.log(m2);
}