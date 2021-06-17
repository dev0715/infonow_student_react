import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Sidebar from '../BlogSidebar'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { MessageSquare } from 'react-feather'
import Breadcrumbs from '@components/breadcrumbs'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

import '@styles/base/pages/page-blog.scss'


const blogMockData = {
  // blog list
  blogList: [
    {
      img: require('@src/assets/images/slider/02.jpg'),
      title: 'The Best Features Coming to iOS and Web design',
      id: 1,
      avatar: require('@src/assets/images/portrait/small/avatar-s-7.jpg'),
      userFullName: 'Ghani Pradita',
      blogPosted: 'Jan 10, 2020',
      tags: ['Quote', 'Fashion'],
      excerpt: 'Donut fruitcake soufflé apple pie candy canes jujubes croissant chocolate bar ice cream.',
      comment: 76
    },
    {
      img: require('@src/assets/images/slider/06.jpg'),
      title: 'Latest Quirky Opening Sentence or Paragraph',
      id: 2,
      avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg'),
      userFullName: 'Jorge Griffin',
      blogPosted: 'Jan 10, 2020',
      tags: ['Gaming', 'Video'],
      excerpt: 'Apple pie caramels lemon drops halvah liquorice carrot cake. Tiramisu brownie lemon drops.',
      comment: 2100
    },
    {
      img: require('@src/assets/images/slider/04.jpg'),
      title: 'Share an Amazing and Shocking Fact or Statistic',
      id: 3,
      avatar: require('@src/assets/images/portrait/small/avatar-s-3.jpg'),
      userFullName: 'Claudia Neal',
      blogPosted: 'Jan 10, 2020',
      tags: ['Gaming', 'Food'],
      excerpt: 'Tiramisu jelly-o chupa chups tootsie roll donut wafer marshmallow cheesecake topping.',
      comment: 243
    },
    {
      img: require('@src/assets/images/slider/03.jpg'),
      title: 'Withhold a Compelling Piece of Information',
      id: 4,
      avatar: require('@src/assets/images/portrait/small/avatar-s-14.jpg'),
      userFullName: 'Fred Boone',
      blogPosted: 'Jan 10, 2020',
      tags: ['Video'],
      excerpt: 'Croissant apple pie lollipop gingerbread. Cookie jujubes chocolate cake icing cheesecake.',
      comment: 10
    },
    {
      img: require('@src/assets/images/slider/09.jpg'),
      title: 'Unadvertised Bonus Opening: Share a Quote',
      id: 5,
      avatar: require('@src/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Billy French',
      blogPosted: 'Jan 10, 2020',
      tags: ['Quote', 'Fashion'],
      excerpt: 'Muffin liquorice candy soufflé bear claw apple pie icing halvah. Pie marshmallow jelly.',
      comment: 319
    },
    {
      img: require('@src/assets/images/slider/10.jpg'),
      title: 'Ships at a distance have Every Man’s Wish on Board',
      id: 6,
      avatar: require('@src/assets/images/portrait/small/avatar-s-13.jpg'),
      userFullName: 'Helena Hunt',
      blogPosted: 'Jan 10, 2020',
      tags: ['Fashion', 'Video'],
      excerpt: 'A little personality goes a long way, especially on a business blog. So don’t be afraid to let loose.',
      comment: 1500
    }
  ],

  // sidebar
  blogSidebar: {
    recentPosts: [
      {
        img: require('@src/assets/images/banner/banner-35.jpg'),
        title: 'Why Should Forget Facebook?',
        id: 7,
        createdTime: 'Jan 14 2020'
      },
      {
        img: require('@src/assets/images/banner/banner-35.jpg'),
        title: 'Publish your passions, your way',
        id: 8,
        createdTime: 'Mar 04 2020'
      },
      {
        img: require('@src/assets/images/banner/banner-39.jpg'),
        title: 'The Best Ways to Retain More',
        id: 9,
        createdTime: 'Feb 18 2020'
      },
      {
        img: require('@src/assets/images/banner/banner-35.jpg'),
        title: 'Share a Shocking Fact or Statistic',
        id: 10,
        createdTime: 'Oct 08 2020'
      }
    ],
    categories: [
      { category: 'Fashion', icon: 'Watch' },
      { category: 'Food', icon: 'ShoppingCart' },
      { category: 'Gaming', icon: 'Command' },
      { category: 'Quote', icon: 'Hash' },
      { category: 'Video', icon: 'Video' }
    ]
  },

  // detail
  blogDetail: {
    blog: {
      img: require('@src/assets/images/banner/banner-35.jpg'),
      title: 'The Best Features Coming to iOS and Web design',
      avatar: require('@src/assets/images/portrait/small/avatar-s-7.jpg'),
      userFullName: 'Ghani Pradita',
      createdTime: 'Jan 10, 2020',
      tags: ['Gaming', 'Video'],
      content:
        '<p class="card-text mb-2">Before you get into the nitty-gritty of coming up with a perfect title, start with a rough draft: your working title. What is that, exactly? A lot of people confuse working titles with topics. Let\'s clear that Topics are very general and could yield several different blog posts. Think "raising healthy kids," or "kitchen storage." A writer might look at either of those topics and choose to take them in very, very different directions.A working title, on the other hand, is very specific and guides the creation of a single blog post. For example, from the topic "raising healthy kids," you could derive the following working title See how different and specific each of those is? That\'s what makes them working titles, instead of overarching topics.</p><h4>Unprecedented Challenge</h4><ul><li>Preliminary thinking systems</li><li>Bandwidth efficient</li><li>Green space</li><li>Social impact</li><li>Thought partnership</li><li>Fully ethical life</li></ul>',
      comments: 19100,
      bookmarked: 139
    },
    comments: [
      {
        avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg'),
        userFullName: 'Chad Alexander',
        commentedAt: 'May 24, 2020',
        commentText:
          'A variation on the question technique above, the multiple-choice question great way to engage your reader.'
      }
    ]
  },

  // edit
  blogEdit: {
    avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg'),
    userFullName: 'Chad Alexander',
    createdTime: 'May 24, 2020',
    blogTitle: 'The Best Features Coming to iOS and Web design',
    blogCategories: [
      { value: 'fashion', label: 'Fashion' },
      { value: 'gaming', label: 'Gaming' }
    ],
    slug: 'the-best-features-coming-to-ios-and-web-design',
    status: 'Published',
    excerpt:
      '<p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p><p><br></p><p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>',
    featuredImage: require('@src/assets/images/slider/03.jpg')
  }
}

const BlogList = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(blogMockData.blogList)
  }, [])

  const badgeColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }
  const renderRenderList = () => {
    return data.map(item => {
      const renderTags = () => {
        return item.tags.map((tag, index) => {
          return (
            <a key={index} href='/' onClick={e => e.preventDefault()}>
              <Badge
                className={classnames({
                  'mr-50': index !== item.tags.length - 1
                })}
                color={badgeColorsArr[tag]}
                pill
              >
                {tag}
              </Badge>
            </a>
          )
        })
      }

      return (
        <Col key={item.title} md='6'>
          <Card>
            <Link to={`/blog/${item.id}`}>
              <CardImg className='img-fluid' src={item.img} alt={item.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/pages/blog/detail/${item.id}`}>
                  {item.title}
                </Link>
              </CardTitle>
              <Media>
                <Avatar className='mr-50' img={item.avatar} imgHeight='24' imgWidth='24' />
                <Media body>
                  <small className='text-muted mr-25'>by</small>
                  <small>
                    <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                      {item.userFullName}
                    </a>
                  </small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>{item.blogPosted}</small>
                </Media>
              </Media>
              <div className='my-1 py-25'>{renderTags()}</div>
              <CardText className='blog-content-truncate'>{item.excerpt}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className='text-body mr-50' />
                  <span className='text-body font-weight-bold'>{item.comment} Comments</span>
                </Link>
                <Link className='font-weight-bold' to={`/pages/blog/detail/${item.id}`}>
                  Read More
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>
            {data !== null ? (
              <div className='blog-list-wrapper'>
                <Row>{renderRenderList()}</Row>
                <Row>
                  <Col sm='12'>
                    <Pagination className='d-flex justify-content-center mt-2'>
                      <PaginationItem className='prev-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          4
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          5
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          6
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}>
                          7
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className='next-item'>
                        <PaginationLink href='#' onClick={e => e.preventDefault()}></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </Fragment>
  )
}

export default BlogList
