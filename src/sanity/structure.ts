import {
  CogIcon,
  HomeIcon,
  MarkerIcon,
  MasterDetailIcon,
  StarFilledIcon,
  WrenchIcon,
} from '@sanity/icons';
import type { ListBuilder, StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder): ListBuilder =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.listItem().title('Inner Pages').child(S.documentTypeList('page')),
      S.listItem()
        .title('Services')
        .icon(WrenchIcon)
        .child(
          S.list()
            .title('Filters & Settings')
            .items([
              S.listItem()
                .id('services')
                .icon(WrenchIcon)
                .title('All Services')
                .schemaType('service')
                .child(S.documentTypeList('service')),
              S.divider(),
              S.listItem()
                .id('servicesLandingPage')
                .icon(MasterDetailIcon)
                .title('Services Landing Page')
                .schemaType('serviceLandingTemplate')
                .child(
                  S.document()
                    .schemaType('serviceLandingTemplate')
                    .documentId('serviceLandingTemplate')
                ),
            ])
        ),
      S.listItem()
        .title('Locations')
        .icon(MarkerIcon)
        .child(
          S.list()
            .title('Filters & Settings')
            .items([
              S.listItem()
                .id('locations')
                .icon(MarkerIcon)
                .title('All Locations')
                .schemaType('location')
                .child(S.documentTypeList('location')),
              S.listItem()
                .id('areas')
                .icon(MarkerIcon)
                .title('Areas')
                .schemaType('area')
                .child(S.documentTypeList('area')),
              S.divider(),
              S.listItem()
                .id('locationTemplates')
                .icon(MasterDetailIcon)
                .title('Location Pages Templates')
                .schemaType('locationTemplates')
                .child(
                  S.document()
                    .schemaType('locationTemplates')
                    .documentId('locationTemplates')
                ),
            ])
        ),
      S.listItem()
        .title('Testimonials')
        .icon(StarFilledIcon)
        .child(S.documentTypeList('testimonial').title('All Testimonials')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),
    ]);
