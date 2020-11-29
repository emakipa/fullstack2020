import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Blog component testing with default content' }
  })
  fireEvent.change(author, {
    target: { value: 'Esa Mäkipää' }
  })
  fireEvent.change(url, {
    target: { value: 'https://something.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Blog component testing with default content')
  expect(createBlog.mock.calls[0][0].author).toBe('Esa Mäkipää' )
  expect(createBlog.mock.calls[0][0].url).toBe('https://something.com')
})
