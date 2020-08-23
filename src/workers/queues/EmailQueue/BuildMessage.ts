interface IData {
  subject: string
  name: string
  email: string
  to: string
  path: string
}

export const buildMessage = ({ subject, name, email, to, path }: IData) => ({
  subject,
  from: `${name} <${email}>`,
  to,
  attachments: [
    {
      filename: `${name.replace(/ /g, '-')}-curriculum.pdf`,
      path,
    },
  ],
})
