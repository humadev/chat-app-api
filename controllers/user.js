const express = require('express');
const prisma = require('@prisma/client');
const prismaClient = new prisma.PrismaClient();
let routes = express.Router();

routes.route('/get').get(getUser);
routes.route('/create').post(createUser);
routes.route('/update').post(udpdateUser);
routes.route('/delete').post(deleteUser);


async function getUser(req, res, next){
    const users = await prismaClient.user.findMany(
        {
            select: {
                email: true,
                name: true,
                followings: {
                    select: {
                        detailFollowing: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                followings: {
                                    select: {
                                        detailFollowing: {
                                            select: {
                                                name: true,
                                                email: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    );

    res.status(200).json(users);
}

async function createUser(req, res, next){
    const users = await prismaClient.friend.create({
        data: {
            me: 6,
            following: 4
        }
    })

    res.status(200).json(users);
}

async function udpdateUser(req, res, next){
    const users = await prismaClient.user.update({
        where: {
            id: 1
        },
        data: {
            name: "darma",
            email: "darma@gmail.com"
        }
    })

    res.status(200).json(users);
}

async function deleteUser(req, res, next){
    const users = await prismaClient.user.delete({
        where: {
            id: 7
        },
    })

    res.status(200).json(users);
}

module.exports = routes; 