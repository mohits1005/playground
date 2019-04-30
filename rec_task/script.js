const state = 'open';//used for open issues
const per_page = 100;//max by github api per call
function getIssues(modUrl, issues, page, isMoreContent) {
    var url = `${modUrl}issues?state=${state}&per_page=${per_page}&page=${page}`;
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(data => { return data.json() })
            .then(res => {
                resolve({ res, page, isMoreContent });
        })
    })
    .then(function (resObj) {
        var arr = issues.concat(resObj.res)
        return resObj.res.length == per_page
        ? getIssues(modUrl, arr, resObj.page + 1, resObj.isMoreContent)//if more content for pagination, api call again
        : arr;//no more content left for pagination, return
    });
}
function displayData(issues) {
    var arr1 = [];//total open issues
    var arr2 = [];//issues opened in last 24 hrs
    var arr3 = [];//issues openend in >24 hrs and  <7 days
    var arr4 = [];//issues openend in >7 days

    var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (24 * 3600);
    var tsLweek = ts - (7 * 24 * 3600);
    for (var i = 0; i < issues.length; i++) {
        var issue = issues[i];
        if (issue.pull_request != undefined && issue.pull_request.url != undefined) {
            //remove pull requests from issues
        }
        else {
            arr1.push(issue);
            //check for timestamp
            var d = new Date(issue.created_at);
            var created = d.getTime() / 1000;//issues opened in <24 hrs
            if (created >= tsYesterday) {
                arr2.push(issue)
            }
            else if (created >= tsLweek && created < tsYesterday) {//issues openend in >24 hrs and  <7 days
                arr3.push(issue)
            }
            else {//issues openend in >7 days
                arr4.push(issue)
            }
        }
    }      
    document.getElementById('total').innerHTML = arr1.length;
    document.getElementById('day').innerHTML = arr2.length;
    document.getElementById('week').innerHTML = arr3.length;
    document.getElementById('gweek').innerHTML = arr4.length;
    //hide loading
    document.getElementsByClassName('loading')[0].classList.add('hidden')
    //show data
    document.getElementsByClassName('response')[0].classList.remove('hidden')
}
function onButtonClick() {
    var issues = [];
    var page = 1;//used for pagination
    var isMoreContent = 1;
    var inputUrl = document.getElementById('gitUrl').value;
    var modUrl = inputUrl.replace("github.com", "api.github.com/repos");

    // console.log(url);
    //show loading
    document.getElementsByClassName('loading')[0].classList.remove('hidden')
    //hide data
    document.getElementsByClassName('response')[0].classList.add('hidden')
    getIssues(modUrl, issues, page, isMoreContent).then(function (issues) {
        displayData(issues);
    })
}