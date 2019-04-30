# Important note #
# This project uses github API #
1. Github allows to diplay max 100 results per api call
2. Results of Github Issues API includes - Issues + Pull requests
3. Pull requests has to be removed in order to obtain true issues
4. Url - https://api.github.com/repos/tidyverse/dplyr/issues with get request list issues (30 -default) both closed and open issues
5. Params state=open is used to get open issues
6. Params per_page=100 is used to get 100 results at a time (max github supports)
7. Params page=1 is used for pagination purposes
8. Issues with pull_request.url are actually pull requests and not issues, hence it can be removed