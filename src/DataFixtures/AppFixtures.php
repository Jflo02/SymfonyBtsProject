<?php

namespace App\DataFixtures;

use App\Entity\Chambre;
use App\Entity\Infirmier;
use App\Entity\Lit;
use App\Entity\Patient;
use App\Entity\Sejour;
use App\Entity\ServiceSejour;
use App\Entity\User;
use App\Repository\SejourRepository;
use App\Repository\ServiceRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{


    /** @var UserPasswordHasherInterface
     * Le hasheur de mots de passe
     *
     */
    private $passwordHasher;

    private $serviceRepository;

    private $sejourRepository;

    public function __construct(UserPasswordHasherInterface $passwordHasher, ServiceRepository $serviceRepository, SejourRepository $sejourRepository)
    {
        $this->serviceRepository = $serviceRepository;
        $this->sejourRepository = $sejourRepository;
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $chambreTab = [];
        $litTab = [];
        $patientTab = [];

        for ($c = 0; $c < 15; $c++) {
            $chambre = new Chambre();
            array_push($chambreTab, $chambre);
            $manager->persist($chambre);
        }

        for ($l = 0; $l < 30; $l++) {
            $lit = new Lit();
            array_push($litTab, $lit);
            $lit->setChambre($faker->randomElement($chambreTab));
            $manager->persist($lit);
        }


        for ($p = 0; $p < 30; $p++) {
            $patient = new Patient();
            array_push($patientTab, $patient);
            $patient->setPrenom($faker->firstName)
                ->setNom($faker->lastName)
                ->setAge($faker->numberBetween(0, 100));
            $manager->persist($patient);

            for ($s = 0; $s < mt_rand(1, 5); $s++) {
                $sejour = new Sejour();
                $sejour->setDateEntree($faker->dateTimeBetween($startDate = '-2 years', $endDate = '-1 years'))
                    ->setDateSortie($faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now'))
                    ->setLit($faker->randomElement($litTab))
                    ->setPatient($patient);
                $manager->persist($sejour);

            }
        }

        for ($u = 0; $u < 3; $u++) {
            $user = new User();

            $hash = $this->passwordHasher->hashPassword($user, "Epsi.123");
            $user->setEmail($faker->email)
                ->setPassword($hash);

            $manager->persist($user);
        }

        $serviceTab = $this->serviceRepository->findAll();

        $sejourTab = $this->sejourRepository->findAll();

        for ($i = 0; $i < 20; $i++) {
            $infirmier = new Infirmier();
            $infirmier->setPrenom($faker->firstName)
                ->setNom($faker->lastName)
                ->setAge($faker->numberBetween(19, 65))
                ->setMotDePasse('Azerty')
                ->setService($faker->randomElement($serviceTab));

            $manager->persist($infirmier);
        }


        for ($ss = 0; $ss < 70; $ss++) {
            $serviceSejour = new ServiceSejour();
            $serviceSejour->setService($faker->randomElement($serviceTab))
                ->setSejour($faker->randomElement($sejourTab))
                ->setDateEntree($faker->dateTimeBetween($startDate = '-2 years', $endDate = '-1 years'))
                ->setDateSortie($faker->dateTimeBetween($startDate = '-1 years', $endDate = 'now'));
            $manager->persist($serviceSejour);

        }


        $manager->flush();
    }
}
