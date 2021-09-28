'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  
  /* remove class 'active' from all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    article.classList.remove('active');
  }
  
  /* get 'href' attribute from the clicked link */
  const href = clickedElement.getAttribute('href');
   
  /* find the correct article using the selector (value of 'href' attribute) */
  const article = document.querySelector(href);
      
  /* add class 'active' to the correct article */
  article.classList.add('active');

};

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList= document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll('.posts .post');
  let html = '';
  for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll('.posts .post');

  /* START LOOP: for every article: */
    for(let article of articles){

    /* find tags wrapper */
    const tagsWrapper= article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = '';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}
generateTags();

// npm run watch:browsersync
// ctrl + c
// git add . && git commit -m "create titlelist"
// git push