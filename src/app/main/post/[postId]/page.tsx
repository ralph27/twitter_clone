import React from 'react'

function Page({ params }: { params: { postId: string } }) {
  console.log(params)
  return <div style={{ marginLeft: '28%' }}>{params.postId}hello</div>
}

export default Page
