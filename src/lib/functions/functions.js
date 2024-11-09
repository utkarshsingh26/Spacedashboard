function hideAll(markers, setMarkers) {
  const copy = [...markers]
  for (let i = 0; i < copy.length; i++) {
    if (copy[i].article) {
      copy[i].textHidden = true
    }
  }

  setMarkers(copy)
}

function clicked(article, props) {
  let click = props.clickedOn.split(',')
  click = click.filter((elm) => (elm != null && elm !== false && elm !== ""))


  if (click.length == 0) {
    article.textHidden = false;
  } else {
    console.log(article)
    let kw = article.article.keywords
    let count = (click).filter(i => kw.split(',').includes(i.toLowerCase())).length;
    if (count > 0) {
      article.textHidden = false;
    } else {
      article.textHidden = true;
    }
  }

}
function filter(markers, setMarkers, props) {
  const copy = [...markers]

  const mapped = props.filterOptions.map((filterOption) => JSON.parse(filterOption.label))
  const labeled = mapped.filter((map) => {
    const article = (map)
    if (article.hidden == false) {
      return article
    }
  })

  // toast.success(labeled.length + " articles to show!")
  const ids = labeled.map((label) => label.article_id)

  for (let i = 0; i < copy.length; i++) {

    if (copy[i].article) {
      if (!ids.includes(copy[i].article.article_id)) {
        copy[i].textHidden = true
      } else if (ids.includes(copy[i].article.article_id)) {
        copy[i].textHidden = false
      }
    }
    clicked(copy[i], props)
  }

  setMarkers(copy)
}

export {hideAll, clicked, filter}