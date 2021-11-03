<?php

namespace App\Repository;

use App\Entity\ServiceSejour;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ServiceSejour|null find($id, $lockMode = null, $lockVersion = null)
 * @method ServiceSejour|null findOneBy(array $criteria, array $orderBy = null)
 * @method ServiceSejour[]    findAll()
 * @method ServiceSejour[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ServiceSejourRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ServiceSejour::class);
    }

    // /**
    //  * @return ServiceSejour[] Returns an array of ServiceSejour objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ServiceSejour
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
