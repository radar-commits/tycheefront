import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const homepageBackground = defineType({
  name: 'homepageBackground',
  title: 'Homepage Background',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      description: 'Full-screen background shown on the homepage.',
    }),
    defineField({
      name: 'artistName',
      title: 'Artist name',
      type: 'string',
      description: 'Shown in the bottom-right credit box.',
    }),
    defineField({
      name: 'artistLink',
      title: 'Artist link',
      type: 'url',
      description: 'The credit box links here.',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Enter a valid URL.'),
    }),
  ],
  preview: {
    select: {title: 'artistName', media: 'backgroundImage'},
    prepare({title, media}) {
      return {
        title: title || 'Homepage Background',
        media,
      }
    },
  },
})
