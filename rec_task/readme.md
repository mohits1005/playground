# Important note #
# This project uses github API #
# working url - https://beta.facenxt.com/rev/ #
1. Github allows to diplay max 100 results per api call
2. Results of Github Issues API includes - Issues + Pull requests
3. Pull requests has to be removed in order to obtain true issues
4. Url - https://api.github.com/repos/tidyverse/dplyr/issues with get request list issues (30 -default) both closed and open issues
5. Params state=open is used to get open issues
6. Params per_page=100 is used to get 100 results at a time (max github supports)
7. Params page=1 is used for pagination purposes
8. Issues with pull_request.url are actually pull requests and not issues, hence it can be removed

# Optimizations #
the task can be optimised in following ways - 
1)  separate api call to get open issues
2)  each of opened issues which are opened in last 7 hrs and last 24 hrs are calculated with separate api calls using since in get query and also handling pagination for each of them.
This optimized approach will work well for issues over 500. If it's lesser, my approach will work faster.