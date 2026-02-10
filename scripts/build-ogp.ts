import satori from 'satori'
import sharp from 'sharp'
import recipes from '../src/generated/recipes.json'
import type { Recipe } from '../src/lib/recipe'
import 'dotenv/config'

// https://developers.google.com/fonts/docs/developer_api?hl=ja
// https://trpfrog.net/blog/google-fonts-on-satori
// https://gist.github.com/TrpFrog/70c28ad13ccb951337b81e55054b70f8
// https://fonts.google.com/specimen/BIZ+UDGothic
// https://fonts.google.com/specimen/BIZ+UDMincho?query=UD

const googleFontsEnv = process.env.GOOGLE_FONTS_API_KEY
const fontsUrl = new URL(
  `https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsEnv}&family=BIZ+UDMincho`
)
const fontsInfo = await fetch(fontsUrl).then((res) => res.json())
const fontMinchoRegularFileUrl = fontsInfo.items[0].files['regular']
const fontMinchoRegularResponse = await fetch(fontMinchoRegularFileUrl)
const fontMinchoRegularBuffer = await fontMinchoRegularResponse.arrayBuffer()
const fontMinchoBoldFileUrl = fontsInfo.items[0].files['700']
const fontMinchoBoldResponse = await fetch(fontMinchoBoldFileUrl)
const fontMinchoBoldBuffer = await fontMinchoBoldResponse.arrayBuffer()

const r = recipes as Recipe[]

for (let i = 0; i < r.length; i++) {
  const recipe = r[i]
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '285px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                width: '630px',
                height: '630px',
                color: 'black',
                paddingLeft: '60px',
                paddingRight: '60px',
                paddingTop: '60px',
                fontFamily: 'BIZ UDMincho',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            fontSize: '30px',
                          },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: {
                                  fontSize: '25px',
                                },
                                children: 'レシピ帳',
                              },
                            },
                            {
                              type: 'div',
                              props: {
                                style: {
                                  alignItems: 'flex-end',
                                  fontSize: '15px',
                                  marginLeft: '15px',
                                },
                                children: '自分だけのレシピサイト',
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: 'hr',
                        props: {
                          style: {
                            width: '510px',
                            border: '0.5px #333333',
                          },
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            marginTop: '20px',
                            fontSize: '60px',
                            lineHeight: 1.2,
                          },
                          children: recipe.title,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            marginLeft: "5px",
                            marginTop: '30px',
                            fontSize: '20px',
                            lineHeight: 1.2,
                          },
                          children: recipe.description,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginLeft: "5px",
                      marginTop: "80px",
                      fontSize: '20px',
                      fontFamily: 'BIZ UDMincho',
                    },
                    children: `主な材料：${Object.keys(recipe.ingredients).slice(0, 2).join('，')}`,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      marginLeft: "5px",
                      marginTop: "8px",
                      fontSize: '20px',
                      fontFamily: 'BIZ UDMincho Bold',
                    },
                    children: `調理時間：${recipe.cookTimeMinutes}分`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'BIZ UDMincho',
          data: fontMinchoRegularBuffer,
        },
        {
          name: 'BIZ UDMincho Bold',
          data: fontMinchoBoldBuffer,
        },
      ],
    }
  )

  await sharp(Buffer.from(svg)).png().toFile(`public/ogp/${recipe.id}.png`)
}
