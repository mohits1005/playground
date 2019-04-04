function fetchBookCallback() {
    fetchData(callback);
}
function callback(data) {
    console.log(data)
}
function fetchData(callback){
    setTimeout(
        () => {
            var data = ['m1', 'm2', 'm3'];
            return callback(data)
        },2000
    );
}
//async await
function fetchDataPromise() {
    return new Promise((resolve, reject)=>{
        setTimeout(
            () => {
                var data = ['m1', 'm2', 'm3'];
                resolve(data);
            },2000)
        });
}
async function getBooksWithAwait(){
    var books = await fetchDataPromise();
    return books;
}
// //promise
function getBooksWithPromise(){
    fetchData.then(books => books)
}
// fetchBookCallback();
// getBooksWithAwait().then(data => console.log(data))
// fetchDataPromise().then(data => console.log(data))
function fetchBook(){
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                // reject('muhaha')
                var data = ['m1', 'm2', 'm3'];
                resolve(data);
            }, 3000)
    });
}
function fetchAuthor() {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => {
                // reject('muhaha')
                var data = ['a1', 'a2', 'a3'];
                resolve(data);
            }, 2000)
    });
}
async function getBooksAndAuthor() {//continuous calls
    const bookPromise = fetchBook();
    const authorPromise = fetchAuthor();
    const book = await bookPromise;
    const author = await authorPromise;
    return {
        author,
        book,
    };
}
// getBooksAndAuthor().then(data => console.log(data));
//more efficient way dont have to wait for other await to resolve + catch error benefit
var run = async function () {
    // tasks run immediate in parallel and wait for both results
    let [r1, r2] = await Promise.all([
        fetchBook(),
        fetchAuthor()
    ]);
    console.log(r1 + ' ' + r2);
};
// run();
//efficient way to catch
var run = async function () {
    let [r1, r2] = await Promise.all([
        fetchBook().catch(err => {console.log('Task 1 failed!'); throw err}),
        fetchAuthor().catch(err => { console.log('Task 2 failed!'); throw err }),
    ]);
    console.log(r1 + ' ' + r2);
};
run().catch(err => console.log('Task(s) failed! Something went wrong!'+err));
