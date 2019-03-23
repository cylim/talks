footer: @cylim226
slidenumbers: true
theme: Next, 8

![](bg.jpg)

# CI/CD with Docker
#### Docker Bday #6: How do YOU #Docker?

[.slidenumbers: false]
[.hide-footer]

---

![](profile.jpg)

## Hi, I’m CY

### Full Stack Software Engineer

#### @cylim226

[.slidenumbers: false]
[.footer: Docker Bday #6: How do YOU #Docker?]


^ freelancer
^ small scale, fast feedback
^ Orchestration won't be part of this topic

---

## What is CI/CD Pipelines?

1. Trigger multi stage tasks to produce certain outcomes
2. Automation the Integration and Deployment process

^ Q: know CI pipelines
^ Q: use CI pipelines
^ We have to go thru a few simple terminology
^ Remember old practices
^ This is not the official description for it

![inline](ci-circle.png)![inline](ci-jenkins.png)![inline](ci-travis.png)![inline](ci-gitlab.png)

---

## Why I choose Gitlab CI?

1. Free tier for private usage[^1]
2. No need any extra manual setup[^2]
3. Come with Gitlab repo
4. In case if needed more minutes[^3]

^ Q: Git repo

[^1]: [Gitlab Pricing](https://about.gitlab.com/pricing/)

[^2]: [Features Comparison](https://about.gitlab.com/pricing/gitlab-com/feature-comparison/)

[^3]: [Install and Register your own runner](https://docs.gitlab.com/runner/register/index.html)

---

## Basic Configuration


```yaml
image: docker:git

stages:
  - build
  - test
  - deploy
  - production

services:
    - docker:dind

variables:
  IMAGE_TAG: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  LATEST_IMAGE: $CI_REGISTRY_IMAGE:latest
  STAGING_IMAGE: $CI_REGISTRY_IMAGE:staging
```

^ Start with declaring

---

## Creating reusable functions

``` yaml
.login_and_pull: &login_and_pull
  before_script:
    - docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
    - echo Pulling Docker from latest image...
    - set +e && docker pull $LATEST_IMAGE > /dev/null && set -e

.push_to_server: &push_to_server
  script:
    - Your script to push to server
    - Request your ochestration tools to 
      - upgrade the services using latest image tag
    - Push your image tag to another registry

```

^ Some script for reusable

---

## Declaring build stage

```yaml
build_dev:
  stage: build
  except:
    - master
  <<: *login_and_pull
  script:
    - docker build --cache-from $LATEST_IMAGE -t $IMAGE_TAG  . > /dev/null
    - docker push $IMAGE_TAG > /dev/null

build_staging:
  stage: build
  only:
    - master
  <<: *login_and_pull
  script:
    - docker build --cache-from $LATEST_IMAGE -t $IMAGE_TAG  . > /dev/null
    - docker push $IMAGE_TAG > /dev/null
    - docker tag $IMAGE_TAG $STAGING_IMAGE
    - docker push $STAGING_IMAGE > /dev/null
```

^ Except and Only

---

## Deployment[^4]

``` yaml
deploy_staging:
  stage: deploy
  only:
    - master
  environment:
    name: staging # Affect by Gitlab environment variables
  <<: *push_to_server
```

[^4]: [environment for paid user only](https://gitlab.com/help/ci/variables/README#limiting-environment-scopes-of-variables-premium)

---

## After client review

```yaml
deploy_production:
  stage: production
  image: cdrx/rancher-gitlab-deploy
  only:
    - master
  when: manual
  <<: *push_to_rancher
```

^ You can use another base image
^ You can trigger the deployment or test manually
^ Rancher is an orchestration tools, it is too broad to cover
^ I didn't create a test project for this talk

---

## What else I can do?

1. Run a services for each pull request[^5]
2. Run a comprehensive test with docker local database[^6]

#### *Not covered in today talks


^ It is not my business requirement
^ Good to have

[^5]: [CI preconfigured variables](https://docs.gitlab.com/ee/ci/variables/) - CI_MERGE_REQUEST_ID

[^6]: Need to seed the data every time but doesn't need to worry about dirty data

---

## What's next?

1. Auto DevOps[^7]
2. Knative[^8]

^ What I might look into in future
^ requirements - base domain constraints

[^7]: [Gitlab Auto DevOps](https://gitlab.com/help/topics/autodevops/index.md)

[^8]: [Serverless with k8s](https://github.com/knative/)

---

# Questions?