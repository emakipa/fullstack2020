import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

test('renders default blog content', () => {
  const blog = {
    title: 'Blog component testing with default content',
    author: 'Esa Mäkipää',
    likes: 0,
    url: 'https://something.com',
    user: {
      username: 'emakip',
      name: 'Esa Mäkipää'
    }
  }

  const component = render(
    <Blog blog={blog} />
  )

  //component.debug()

  expect(component.container).toHaveTextContent(
    'Blog component testing'
  )
  expect(component.container).toHaveTextContent(
    'Esa Mäkipää'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )
  expect(component.container).not.toHaveTextContent(
    'https://something.com'
  )
})

test('clicking button renders full blog content', () => {
  const blog = {
    title: 'Blog component testing with full content',
    author: 'Esa Mäkipää',
    likes: 0,
    url: 'https://something.com',
    user: {
      username: 'emakip',
      name: 'Esa Mäkipää'
    }
  }

  const component = render(
    <Blog blog={blog} user={blog.user}/>
  )

  //component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Blog component testing'
  )
  expect(component.container).toHaveTextContent(
    'Esa Mäkipää'
  )
  expect(component.container).toHaveTextContent(
    'likes'
  )
  expect(component.container).toHaveTextContent(
    'https://something.com'
  )
})

test('clicking like button two times calls onClickUpdate twice', () => {
  const blog = {
    title: 'Blog component testing with full content',
    author: 'Esa Mäkipää',
    likes: 0,
    url: 'https://something.com',
    user: {
      username: 'emakip',
      name: 'Esa Mäkipää'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClickUpdate={mockHandler} user={blog.user}/>
  )

  //component.debug()

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  //component.debug()

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})