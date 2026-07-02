/* eslint-disable camelcase */
import { faker } from '@faker-js/faker';

export const createUserPayload = {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    website: faker.internet.url()
};

export const updateUserPayload = {
    name: faker.person.fullName(),
    email: faker.internet.email()
};

export const validPostPayload = (userId: number) => {
    return {
        userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph()
    };
};
