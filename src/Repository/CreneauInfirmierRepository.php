<?php

namespace App\Repository;

use App\Entity\CreneauInfirmier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CreneauInfirmier|null find($id, $lockMode = null, $lockVersion = null)
 * @method CreneauInfirmier|null findOneBy(array $criteria, array $orderBy = null)
 * @method CreneauInfirmier[]    findAll()
 * @method CreneauInfirmier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CreneauInfirmierRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CreneauInfirmier::class);
    }

    // /**
    //  * @return CreneauInfirmier[] Returns an array of CreneauInfirmier objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CreneauInfirmier
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
