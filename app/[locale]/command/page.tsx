"use client"
import { useState } from 'react'
import Form_step_1 from '@/components/Command/Form_step_1'
import View_Bot from '@/components/Command/View_bot'
import style from '@/public/style/command.module.css'

const Command = () => {
  const [bot, setBot] = useState({
    name: "",
    img: "",
    img_url: "",
    host: "false",
    description: "",
    comment: "",
  });
  
  return (
    <main>
        <div className={style.container_commande}>
          <View_Bot bot_view={bot}/>

          <Form_step_1 bot={bot} setBot={setBot}/>
        </div>
      </main>
  )
}

export default Command