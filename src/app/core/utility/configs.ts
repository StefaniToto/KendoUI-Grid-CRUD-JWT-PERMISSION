
import { ConfigOption } from '@ngx-formly/core';

import { ButtoniFormComponent } from '../forms/buttoni-form/buttoni-form.component';

export const formlyConfig: ConfigOption = {

    types: [
        {
            name: 'action',
            component: ButtoniFormComponent,
            defaultOptions: {
                templateOptions: {
                    onlyDelete: true,
                    onlyUpdate: true,
                },
            },
        },

    ]
};

