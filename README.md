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

### Next Steps

- Update auth to Passport.js
- Set project keys to db IDs
- Define localhost port as a variable
- Truncate comment list, click to view more
- Build out schema for samples
- Set up access for teams & roles
- Ability to take & upload images directly or via file uploader
- Ability to star images/docs

### Questions/Unknowns

- Wouldn't appending a new comment (and then reversing the comment array for display) be very heavy in terms of time complexity?
- in AppContent.js line 31, should that parameter be previousComments or prevComments?