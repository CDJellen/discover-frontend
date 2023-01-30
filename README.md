# Discover Open-Source

Use your favorite open-source projects as a seed for discovering new projects to contribute to and learn from.

### Purpose
This web app leverages the GitHub social graph to make interesting, open-source projects more discoverable.

This is accomplished by identifying the top contributors for a given repository, and then finding the other repositories these developers contribute to.

The process starts with a seed repository, preferably one that you the end-user are interested in or learned from, and suggests new repositories you might find value in using a visual, contributor-first network.

As a repository's name does not always convey the mission and vision for a project, repository nodes will display the project's `README` when double-clicked in the network.  This feature greatly enhances the value of the app, as users can get a deeper understanding of projects which might align with their interests before diving in to their source code.

Discover Open Source is primarily a time-saving feature for exploring the open-source community, and keeping up to date with top contributors from your favorite projects.

### Technical Details
A web application built with [SvelteKit](https://kit.svelte.dev/) and TypeScript.

This project was designed for deployment over Azure Static Web Apps (SWA).
See the [documentation](https://portal.azure.com) for more information.

#### More Information
This project was designed as a learning effort, both in better understanding the GitHub REST API and in developing experience with TypeScript and Svelte.  The project was made successful thanks to the excellent resources and documentation made available by GitHub, as well as the Svelte community and its replits.

If you are pursuing a similar learning endeavour, I would highly encourage you to look into these resources.

#### Questions
If you have questions regarding the app please post them into
the [GitHub discussion forum](https://github.com/cdjellen/discover-open-source/discussions).


#### Contributing
The project is actively maintained, please feel free to open a pull request if you have any suggested improvements, test coverage is strongly preferred.

If you have ideas for new features or interesting ways to navigate GitHub to discover new, interesting, and open-source projects, feel free to add features ideas to the [discussion](https://github.com/cdjellen/discover-open-source/discussions).
