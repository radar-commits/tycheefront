import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'

// Streaming platforms tychee publishes to. Add more here if needed.
const PLATFORMS = [
  {title: 'Spotify', value: 'Spotify'},
  {title: 'Apple Music', value: 'Apple Music'},
  {title: 'SoundCloud', value: 'SoundCloud'},
  {title: 'YouTube Music', value: 'YouTube Music'},
  {title: 'Tidal', value: 'Tidal'},
  {title: 'Amazon Music', value: 'Amazon Music'},
  {title: 'Bandcamp', value: 'Bandcamp'},
  {title: 'Other', value: 'Other'},
]

export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Release title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverArt',
      title: 'Cover art',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
      description: 'The banner shows the release with the most recent date.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Listen links',
      type: 'array',
      validation: (rule) => rule.min(1).error('Add at least one place to listen.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'listenLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {list: PLATFORMS, layout: 'dropdown'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Release date, newest first',
      name: 'releaseDateDesc',
      by: [{field: 'releaseDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'releaseDate', media: 'coverArt'},
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString()
          : 'No date',
        media,
      }
    },
  },
})
