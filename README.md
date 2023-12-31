# Sample Tracking App

## Objective

A web app designed to track sampling for manufacturing, including iterations, changelogs, and comments by multiple stakeholders.

### Who is it for?

It depends! A simple project could include one or more members of a manufacturing team, and one or more members of the wholesaler team (in other words, the customer). There may be other entities involved, such as a manufacturing agent, subcontractors, or designers. This app is designed to streamline and document communication among all of these parties.

## Functionality

Initial functionality will include the ability to create a project, invite collaborators, document iterations, and comment on issues.

### Future Functionality

- Ability to define teams, and roles within teams
- Ability to tag users in a comment
- Ability to resolve comments 
- Home feed w/ digest of new info, organized by project
- Ability to take & upload images directly or via file uploader
- Ability to star images/doc
- Set up access for teams & roles
- Edit & resolve functionality for comments

### Next Steps

- Update auth to Passport.js
- Set project keys to db IDs
- Define localhost port as a variable
- Build out schema for samples
- Refactor db connection to async/await
- Change from hard limit on comment display to something else--truncated, etc.
- Add check for dup username to registration route

### Questions/Unknowns

- Wouldn't appending a new comment (and then reversing the comment array for display) be very heavy in terms of time complexity?
- in AppContent.js line 31, should that parameter be previousComments or prevComments?
- Look into encryption options
- React has .env built-in. Necessary to install for server side?
- is .join a socket.io method?
- Use typescript? Or jsDOC?
- Scaling server connections--AWS API Gateway, or something similar?
- Do we need to limit display of comments after new comments are added? Limit is 15 upon loading (openProject), but no limit added afterwards.
- Fixed issue with newly added comments going to the top. But why does changing the sort on openProject not seem to do anything?

### Absolute next step

- Updating auth to Passport.js
- Include checking username for dup
