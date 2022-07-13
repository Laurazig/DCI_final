# DCI_final
DCI Fullstack Web Development course - final project

1

2

3

4

5

6

7

8

9

GitHub Workflow: Feature Branches and Pull Requests
Stage 1: Setup1

2

3

4

5

6

7

8

9

GitHub Workflow: Feature Branches and Pull Requests
Stage 1: Setup
You should mirror this setup process when creating your Final Project repo!
1. One team member should create a new GitHub repo called “restaurants”. While 
doing so, they should share their screen with the other team members. When 
creating the repo, they should (a) make the repo public, and (b) select the option to 
add a README file.
When the repo has been created, the repo owner should make the other team 
members collaborators. 
Finally, the owner should go to Settings > Branches > Branch Protection Rules, 
and click the “Add rule” button. 
Next, they should type “main” in the “Branch name pattern” input. Then, they 
should select the “Require pull request reviews before merging” checkbox and 
then the “Require approvals” checkbox (leave “required number of approvals before
merging” set to “1”):
Finally, they should select the “Include administrators” checkbox, and then hit the 
“Create” button.
2. Once all the above steps have been completed, all team members should clone the 
project to their own computer:
 git clone <project_url> 
When this is done, you should open the project folder in VS Code and check (a) the 
status of your repo, and (b) the name of the current branch:
 git status 
 git branch 
The branch should be called “main”.
3. Each team member will be responsible for creating one text file in their local repo, 
containing the name of a restaurant. E.g. one team member will create a text file 
containing the name of a Chinese restaurant (e.g. chinese-restaurant.txt), another 
team member will do the same with an Italian restaurant (e.g. italian-restaurant.txt), 
and so on. You will start to do this in    Step 4   .  
Before you go on to Step 4, have a quick talk with your colleagues to decide which 
kind of restaurant you will each be responsible for. Note: each team member should 
be responsible for a different kind of restaurant!
____________________________________________________________________
Stage 2: Working on a Feature Branch
Instead of letting everyone work on/push changes to the main branch, you will 
each create a feature branch for any changes you make. This will allow you to 
work on your own changes, and only update the main branch when the feature 
you are working on is complete, and ready to be part of the “official version” of 
your project.
You should think of the main branch as the “single source of truth” for your 
project – you do not want to add broken or incomplete code to “main”, only 
working code which adds something new to the project!
4. First, each team member should create and checkout (“start using”) a new feature 
branch, with the name of their cuisine. In this example, I will make a “mexican-
cuisine” feature branch – you can use your own cuisine type:
 git checkout -b mexican-cuisine 
Once this is done, check you are on the new branch:
 git branch 
5. Now you should create a text file (e.g. mexican-cuisine.txt) in your local VS Code 
repo and add the name of a restaurant to it. Feel free to use a restaurant you like, or 
just make one up! When you have saved the file, you should add and commit your 
changes:
 git add .
 git commit -m “Add mexican cuisine text file” 
6. When you think your feature is ready to merge with main (or if you are having 
trouble with a feature and want a colleague to be able to take a look!), you can push 
your feature branch to the GitHub repo. You can do this with the command “git 
push origin <feature_branch>”. In my case, the command would be:
 git push origin mexican-cuisine 
When this is done, check your repo on GitHub to make sure the feature branch has 
been successfully pushed.
____________________________________________________________________
Stage 3: Making a pull request
In most organizations you can’t “just” add new code to the “main” branch 
without some kind of code review process! 
For that, we use “pull requests” – you request that someone more senior pulls 
your feature branch to check the code is all correct and meets all specifications!
If that person is happy with your changes, they can then merge the changes to 
main and delete your feature branch. However, if there is still more to do, they 
can give you feedback, and only merge your feature branch with main later, 
when they are happy with your code.
In the Final Project, we will simulate this process by asking you to make a pull 
request when you want to merge a feature branch to main. Any of your 
colleagues can respond to this pull request and merge your changes to main.
7. In the GitHub repo, make sure you are on your own feature branch (with your 
cuisine type), and then click the “Compare & request” button.
Add a title and comment and then click the “Create pull request” button.
When you have finished, confirm to your teammates that you have done this. 
8. After all team members have created a pull request, you should respond to one of 
your colleagues’ pull requests, to confirm that that colleague’s code can be merged to 
the main branch.
Before continuing, please agree within your team who will respond to each pull 
request! Each team member should respond to one colleage’s pull request, e.g.
Person A → responds to Person B’s pull request
Person B → responds to Person C’s pull request
Person C → responds to Person D’s pull request
Person D → responds to Person A’s pull request
To respond to a pull request you should click on the “Pull requests” tab and select 
the request you want to respond to. Next you should see details about the request – 
you can click the “Add your review” link to review the pull request:
9. Next you will be able to review the changes your colleague made before deciding 
whether to approve their changes, or suggest further changes. Click the “Review 
changes” button, and select the “Approve” radio button. Then click the “Submit 
review” button.
As the Final Project is a practice project, you should accept your colleagues’ pull
requests by default, to prevent adding extra work to your schedule. In a real 
organization, there would be a proper code review process!
10. Now you have approved your colleague’s pull request, you can merge their 
changes to the “main” branch. Click the “Merge pull request” button to do so, and 
then the “Confirm merge” button: 
Finally, don’t forget to delete the feature branch after it has been merged:
Now you can check the “main” branch on GitHub – your colleague’s changes should 
have been successfully merged!
Now, please wait for all your team’s pull requests to be accepted before moving onto 
Step 11.
11. Once a colleague has approved your pull request and deleted your branch on 
GitHub, you can also delete the branch in your local VS Code repo. 
To do this, you should go back to VS Code and checkout the main branch (as you 
cannot delete a branch you are currently on). You can do this with the following 
command:
 git checkout main
Next, make sure you are on the main branch using:
 git branch
Once you have confirmed are on the main branch, you can delete your merged feature
branch with the following command:
 git branch -d mexican-cuisine 
12. Finally, assuming      your team already confirmed    all GitHub pull requests were    
approved, you can update your local VS Code repo with the latest code from 
GitHub.
This will update your local main branch so you can see all the latest restaurant 
files added by you and your colleagues!
To pull the latest version of the main branch from GitHub, and merge it with the 
branch you are currently working on in VS Code, you can use the command:
 git pull origin main 
If you are already on the main branch in VS Code (you should be!), you can also use:
 git pull 
Final Project Notes: Whenever you create a pull request on GitHub, you should 
immediately reach out to your colleagues and ask one of them to approve it.
Also, whenever you approve a colleague’s pull request on GitHub, please make 
sure to tell the whole team (e.g. via Slack) that the main branch has been 
updated. 
This will give your colleagues the opportunity to pull the latest version of the 
main branch from GitHub into the branch they are currently working on, so 
they have access to the latest code!
You should mirror this setup process when creating your Final Project repo!
1. One team member should create a new GitHub repo called “restaurants”. While 
doing so, they should share their screen with the other team members. When 
creating the repo, they should (a) make the repo public, and (b) select the option to 
add a README file.
When the repo has been created, the repo owner should make the other team 
members collaborators. 
Finally, the owner should go to Settings > Branches > Branch Protection Rules, 
and click the “Add rule” button. 
Next, they should type “main” in the “Branch name pattern” input. Then, they 
should select the “Require pull request reviews before merging” checkbox and 
then the “Require approvals” checkbox (leave “required number of approvals before
merging” set to “1”):
Finally, they should select the “Include administrators” checkbox, and then hit the 
“Create” button.
2. Once all the above steps have been completed, all team members should clone the 
project to their own computer:
 git clone <project_url> 
When this is done, you should open the project folder in VS Code and check (a) the 
status of your repo, and (b) the name of the current branch:
 git status 
 git branch 
The branch should be called “main”.
3. Each team member will be responsible for creating one text file in their local repo, 
containing the name of a restaurant. E.g. one team member will create a text file 
containing the name of a Chinese restaurant (e.g. chinese-restaurant.txt), another 
team member will do the same with an Italian restaurant (e.g. italian-restaurant.txt), 
and so on. You will start to do this in    Step 4   .  
Before you go on to Step 4, have a quick talk with your colleagues to decide which 
kind of restaurant you will each be responsible for. Note: each team member should 
be responsible for a different kind of restaurant!
____________________________________________________________________
Stage 2: Working on a Feature Branch
Instead of letting everyone work on/push changes to the main branch, you will 
each create a feature branch for any changes you make. This will allow you to 
work on your own changes, and only update the main branch when the feature 
you are working on is complete, and ready to be part of the “official version” of 
your project.
You should think of the main branch as the “single source of truth” for your 
project – you do not want to add broken or incomplete code to “main”, only 
working code which adds something new to the project!
4. First, each team member should create and checkout (“start using”) a new feature 
branch, with the name of their cuisine. In this example, I will make a “mexican-
cuisine” feature branch – you can use your own cuisine type:
 git checkout -b mexican-cuisine 
Once this is done, check you are on the new branch:
 git branch 
5. Now you should create a text file (e.g. mexican-cuisine.txt) in your local VS Code 
repo and add the name of a restaurant to it. Feel free to use a restaurant you like, or 
just make one up! When you have saved the file, you should add and commit your 
changes:
 git add .
 git commit -m “Add mexican cuisine text file” 
6. When you think your feature is ready to merge with main (or if you are having 
trouble with a feature and want a colleague to be able to take a look!), you can push 
your feature branch to the GitHub repo. You can do this with the command “git 
push origin <feature_branch>”. In my case, the command would be:
 git push origin mexican-cuisine 
When this is done, check your repo on GitHub to make sure the feature branch has 
been successfully pushed.
____________________________________________________________________
Stage 3: Making a pull request
In most organizations you can’t “just” add new code to the “main” branch 
without some kind of code review process! 
For that, we use “pull requests” – you request that someone more senior pulls 
your feature branch to check the code is all correct and meets all specifications!
If that person is happy with your changes, they can then merge the changes to 
main and delete your feature branch. However, if there is still more to do, they 
can give you feedback, and only merge your feature branch with main later, 
when they are happy with your code.
In the Final Project, we will simulate this process by asking you to make a pull 
request when you want to merge a feature branch to main. Any of your 
colleagues can respond to this pull request and merge your changes to main.
7. In the GitHub repo, make sure you are on your own feature branch (with your 
cuisine type), and then click the “Compare & request” button.
Add a title and comment and then click the “Create pull request” button.
When you have finished, confirm to your teammates that you have done this. 
8. After all team members have created a pull request, you should respond to one of 
your colleagues’ pull requests, to confirm that that colleague’s code can be merged to 
the main branch.
Before continuing, please agree within your team who will respond to each pull 
request! Each team member should respond to one colleage’s pull request, e.g.
Person A → responds to Person B’s pull request
Person B → responds to Person C’s pull request
Person C → responds to Person D’s pull request
Person D → responds to Person A’s pull request
To respond to a pull request you should click on the “Pull requests” tab and select 
the request you want to respond to. Next you should see details about the request – 
you can click the “Add your review” link to review the pull request:
9. Next you will be able to review the changes your colleague made before deciding 
whether to approve their changes, or suggest further changes. Click the “Review 
changes” button, and select the “Approve” radio button. Then click the “Submit 
review” button.
As the Final Project is a practice project, you should accept your colleagues’ pull
requests by default, to prevent adding extra work to your schedule. In a real 
organization, there would be a proper code review process!
10. Now you have approved your colleague’s pull request, you can merge their 
changes to the “main” branch. Click the “Merge pull request” button to do so, and 
then the “Confirm merge” button: 
Finally, don’t forget to delete the feature branch after it has been merged:
Now you can check the “main” branch on GitHub – your colleague’s changes should 
have been successfully merged!
Now, please wait for all your team’s pull requests to be accepted before moving onto 
Step 11.
11. Once a colleague has approved your pull request and deleted your branch on 
GitHub, you can also delete the branch in your local VS Code repo. 
To do this, you should go back to VS Code and checkout the main branch (as you 
cannot delete a branch you are currently on). You can do this with the following 
command:
 git checkout main
Next, make sure you are on the main branch using:
 git branch
Once you have confirmed are on the main branch, you can delete your merged feature
branch with the following command:
 git branch -d mexican-cuisine 
12. Finally, assuming      your team already confirmed    all GitHub pull requests were    
approved, you can update your local VS Code repo with the latest code from 
GitHub.
This will update your local main branch so you can see all the latest restaurant 
files added by you and your colleagues!
To pull the latest version of the main branch from GitHub, and merge it with the 
branch you are currently working on in VS Code, you can use the command:
 git pull origin main 
If you are already on the main branch in VS Code (you should be!), you can also use:
 git pull 
Final Project Notes: Whenever you create a pull request on GitHub, you should 
immediately reach out to your colleagues and ask one of them to approve it.
Also, whenever you approve a colleague’s pull request on GitHub, please make 
sure to tell the whole team (e.g. via Slack) that the main branch has been 
updated. 
This will give your colleagues the opportunity to pull the latest version of the 
main branch from GitHub into the branch they are currently working on, so 
they have access to the latest code!
